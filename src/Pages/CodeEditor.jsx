import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Description from "../components/Description";
import Sample from "../components/Sample";
import Submissions from "../components/Submissions";
import { io } from "socket.io-client";
import Timer from "../components/Timer";

const BACKEND_URL = import.meta.env.VITE_API_URL;

function encodeBase64(str) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

const CodeEditor = () => {
  const languages = ["cpp", "java", "python"];
  const [language, setLanguage] = useState("python");

  const [code, setCode] = useState("");

  const [output, setOutput] = useState("");
  const [submitResult, setSubmitResult] = useState(null);
  const [customInput, setCustomInput] = useState("");
  
  const [machineInput, setMachineInput] = useState("");
  const [machineOutput, setMachineOutput] = useState(null);

  const [editorHeight, setEditorHeight] = useState("500px");

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
   const [isMachineRun, setIsMachineRun] = useState(false);

  const [activeTab, setActiveTab] = useState("description");
  const [question, setQuestion] = useState({});
  const [userSubmissions, setUserSubmissions] = useState([]);

  const [lastInput,setLastInput] = useState("");

  const leftColRef = useRef(null);
  const socketRef = useRef(null);
  const navigate = useNavigate();

  const location = useLocation();
  const questionIndex = location.state?.problem_id;

  const defaultCode = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    java: `import java.util.*;
    
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    python: `print("Hello, World!")`,
  };

  //Load save
  useEffect(() => {
    if (!question?.id) return;
    const saved = localStorage.getItem(`code_q${question.id}_${language}`);
    if (saved) setCode(saved);
    else setCode(defaultCode[language]);
  }, [question?.id, language]);

  // Auto-save code
  useEffect(() => {
    if (!question?.id) return;
    const timer = setTimeout(() => {
      localStorage.setItem(`code_q${question.id}_${language}`, code);
    }, 1000);
    return () => clearTimeout(timer);
  }, [code, question?.id, language]);


  useEffect(() => {
    setCode(defaultCode[language]);
  }, [language]);

  // Adjust editor height
  useEffect(() => {
    const updateHeight = () => {
      if (leftColRef.current)
        setEditorHeight(`${leftColRef.current.clientHeight}px`);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  //fetch question

  useEffect(() => {
    if (!questionIndex) return;
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/problems/${questionIndex}`,
          { withCredentials: true }
        );
        setQuestion(res.data);
      } catch (err) {
        console.error("Error fetching question:", err);
      }
    };
    fetchQuestion();
  }, [questionIndex]);

  //io initialization for run and submit code
  useEffect(() => {
    // Only create socket if not already created
    if (!socketRef.current) {
      socketRef.current = io(BACKEND_URL, {
        withCredentials: true,
        transports: ["websocket"],
      });

      socketRef.current.on("connect", () => {
        console.log("Socket connected:", socketRef.current.id);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  

  // Run code
  const runCode = async () => {
    setIsRunning(true);
    setOutput(null);
    setSubmitResult(null);
    

    const payload = {
      code: encodeBase64(code),
      customTestcase: encodeBase64(customInput),
      language,
      problem_id: question?.id || 1,
      event_id: 2,
    };

    try {
      const res = await axios.post(`${BACKEND_URL}/submission/run`, payload, {
        withCredentials: true,
      });

      console.log(res.data.submission_id);

      // setActivationId(res.data.submission_id);

      const handleResult = (data) => {
        console.log(data);
        if (data.user_output) {
          setOutput(data.user_output);
        } else {
          setOutput(`${data.status} : ${data.message}`);
        }
        // Remove listener after receiving result
      
        setIsRunning(false);
        socketRef.current.off("result", handleResult);
      };

      // Subscribe to this submission

      socketRef.current.emit("subscribe", res.data.submission_id);
      socketRef.current.on("result", handleResult);
    } catch (err) {
      if (err.response.status === 403) {
        navigate("/results");
      }
      setOutput("Error: " + (err.response?.data?.message || err.message));
    }
  };

  const submitCode = async () => {
    setIsSubmitting(true);
    setOutput(null);
    setSubmitResult(null);

    
 

    try {
      const res = await axios.post(
        `${BACKEND_URL}/submission/submit`,
        {
          code: encodeBase64(code),
          language,
          problem_id: question?.id || 1,
          event_id: 2,
        },
        { withCredentials: true }
      );

      console.log(res.error);

      // Save submission_id to trigger useEffect
      

      const handleResult = (data) => {
        console.log(data);
        const parsedData = {
          status: data.status || "unknown",
          message: data.message || "",
          failed_test_case: parseInt(data.failed_test_case ?? "0", 10),
          total_test_case: parseInt(data.total_test_case ?? "0", 10),
          score: parseInt(data.score ?? "0", 10),
        };

        setSubmitResult(parsedData);

        if (
          parsedData.status === "accepted" &&
          !localStorage.getItem(`solved_${questionIndex}`)
        ) {
          localStorage.setItem(`solved_${questionIndex}`, "solved");
        }
        setIsSubmitting(false)

        // Remove listener after handling result
        socketRef.current.off("result", handleResult);
      };

      // Subscribe to this submission
      socketRef.current.emit("subscribe", res.data.submission_id);
      socketRef.current.on("result", handleResult);

    } catch (err) {
      if (err.response.status === 403) {
        navigate("/results");
      }

      console.error("Submission error:", err);
      setSubmitResult({
        status: "error",
        message: err,
      });
    }
  };

  const machineRun = async () => {
    setMachineOutput(null);
    setIsMachineRun(true);
    setLastInput(machineInput);

    const payload = {
      customTestcase: encodeBase64(machineInput),
      problem_id: question?.id || 1,
      event_id: 2,
    };

    try {
      const res = await axios.post(
        `${BACKEND_URL}/submission/run-system`,
        payload,
        {
          withCredentials: true,
        }
      );
      
      // setActivationId(res.data.submission_id);

      const handleResult = (data) => {
        console.log(data);

        setMachineOutput(
          data.user_output
            ? data.user_output
            : `${data.status} : ${data.message}`
        );

        setIsMachineRun(false);

        

        // Remove listener after handling result
        socketRef.current.off("result", handleResult);
      };

      // Subscribe to this submission
      socketRef.current.emit("subscribe", res.data.submission_id);
      socketRef.current.on("result", handleResult);
      
    } catch (err) {
      setOutput("Error: " + (err.response?.data?.message || err.message));
    }
  };

  //fetch submissions
  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/user/gethistory`, {
        withCredentials: true,
      });
      const filterData = res.data.filter(
        (submission) => submission.problem_id === questionIndex
      );
      setUserSubmissions(filterData);
    } catch {
      void 0;
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#191919] px-3">
      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>

      <div className="mt-5 flex justify-end w-[80vw] ml-[17vw] p-4 ">
        <Timer/>
      </div>

      {/* Tabs & Language Selector */}
      <div className="w-full text-white mt-5 flex justify-end pr-[1.5%]">
        <div className="w-1/2 text-white mt-10 flex flex-row justify-start gap-4 p-4  rounded-2xl shadow-md bg-[#1A1A1A]">
          {["Description", "SampleCase", "Submissions"].map((tab) => (
            <div
              key={tab}
              className={`cursor-pointer px-3 py-1 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200
                          ${
                            activeTab === tab
                              ? "bg-[#CAFF33] text-black shadow-lg"
                              : "text-white hover:text-[#CAFF33]"
                          }`}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "Submissions") fetchSubmissions();
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="w-1/2 flex justify-end items-center gap-3 px-4 mt-10  rounded-2xl shadow-md bg-[#1A1A1A]">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#CAFF33] text-black font-semibold rounded-full px-4 py-2 shadow-md hover:scale-105 transition-transform duration-200"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Question + Code Editor */}
      <div
        className="w-full flex flex-col lg:flex-row gap-6 p-4"
        ref={leftColRef}
      >
        {/* Left Column: Question / Samples / Submissions */}
        <div className="w-full flex flex-col lg:w-1/2  gap-4 overflow-y-auto rounded-lg shadow-xl bg-gradient-to-b from-[#1C1C1C] to-[#2A2A2A] p-4">
          {/* Question / Samples / Submissions */}
          <div className="border-2 border-[#CAFF33] p-4 rounded-lg bg-[#1B1B1B] shadow-inner">
            {activeTab === "description" && (
              <Description
                Question={question || { title: "", description: "", points: 0 }}
              />
            )}
            {activeTab === "sampleCase" && (
              <Sample samples={question.samples || []} />
            )}
            {activeTab === "Submissions" && (
              <Submissions userSubmissions={userSubmissions} />
            )}
          </div>

          {/* Test Case Section */}
          <div className="flex flex-col border-2 border-[#CAFF33] rounded-lg p-4 bg-[#222222] shadow-md text-white gap-3">
            <div className="text-lg font-semibold text-[#CAFF33]">
              Test Case
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input Box */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-400 mb-1">Input</label>
                <textarea
                  className="bg-[#1C1C1C] border border-[#555] rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#CAFF33] resize-none"
                  rows={5}
                  value={machineInput}
                  onChange={(e) => setMachineInput(e.target.value)}
                  placeholder="Enter input here"
                ></textarea>
              </div>

              {/* Output Display Box */}
              <div className="flex flex-col">
                <label className="text-sm text-gray-400 mb-1">
                  Expected Output
                </label>
                <div className="bg-[#1C1C1C] border border-[#555] rounded-md p-3 text-white h-[120px] overflow-auto">
                  {/* Dynamically display output here */}
                  {machineOutput}
                </div>
              </div>
            </div>

            <button
              disabled={isMachineRun  || lastInput === machineInput}
              className="mt-3 bg-[#CAFF33] text-black font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-[#292929] border-2 border-[#CAFF33] hover:text-[#CAFF33] transition-all duration-200 disabled:bg-[#7D9900] disabled:cursor-not-allowed disabled:opacity-70"
              onClick={machineRun}
            >
              Machine Run
            </button>
          </div>
        </div>

        {/* Right Column: Code Editor + Custom Test Case / Submission Results */}
        <div
          className="w-full lg:w-1/2 flex flex-col  rounded-lg shadow-md bg-[#1C1C1C] p-3  "
          style={{ height: editorHeight }}
        >
          {/* Editor */}
          <div className="flex-1 border border-[#CAFF33]">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                fontSize: 15,
                fontFamily: "Fira Code, monospace",
                minimap: { enabled: false },
                tabSize: 2,
                insertSpaces: true,
                detectIndentation: false,
                quickSuggestions: false,
                contextmenu: false,
              }}
              onMount={(editor, monaco) => {
                monaco.editor.defineTheme("dark-custom", {
                  base: "vs-dark",
                  inherit: true,
                  rules: [
                    { token: "", foreground: "E0E0E0" },
                    { token: "keyword", foreground: "FF79C6" },
                    { token: "string", foreground: "50FA7B" },
                    { token: "number", foreground: "BD93F9" },
                    {
                      token: "comment",
                      foreground: "6272A4",
                      fontStyle: "italic",
                    },
                    { token: "type", foreground: "8BE9FD" },
                    { token: "function", foreground: "F1FA8C" },
                  ],
                  colors: {
                    "editor.background": "#1C1C1C",
                    "editor.foreground": "#E0E0E0",
                    "editorCursor.foreground": "#FF4136",
                    "editor.lineHighlightBackground": "#2A2A2A",
                    "editorLineNumber.foreground": "#7FDBFF",
                    "editor.selectionBackground": "#44475A",
                    "editorIndentGuide.background": "#44475A",
                    "editorIndentGuide.activeBackground": "#6272A4",
                  },
                });
                monaco.editor.setTheme("dark-custom");

                // Tab inserts spaces
                editor.addCommand(monaco.KeyCode.Tab, () => {
                  editor.trigger("keyboard", "type", { text: "  " });
                });
              }}
            />
          </div>

          {/* Custom Test Case / Submission Results */}
          <div className="flex flex-col gap-4  mt-3">
            {submitResult ? (
              <div className="p-4 border border-[#CAFF33] rounded-md bg-[#1C1C1C]/30 text-white">
                <p className="font-bold mb-2">
                  Status:{" "}
                  <span
                    className={
                      submitResult.status?.toLowerCase() === "accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {submitResult.status}
                  </span>{" "}
                  | Score: {submitResult.score ?? 0}
                </p>
                <p className="mb-3">
                  {submitResult.failed_test_case === 0
                    ? ` ${submitResult.total_test_case}/${
                        submitResult.total_test_case
                      } test cases passed`
                    : `${submitResult.failed_test_case - 1} / ${
                        submitResult.total_test_case
                      } test cases passed`}
                </p>
                <div className="space-y-2">
                  {Array.from({ length: submitResult.total_test_case }).map(
                    (_, idx) => {
                      let statusClass = "text-white";
                      let text = `Test Case ${idx + 1}`;

                      if (
                        submitResult.failed_test_case === 0 ||
                        idx + 1 < submitResult.failed_test_case
                      ) {
                        statusClass = "text-green-400";
                        text += ": PASSED";
                      } else if (idx + 1 === submitResult.failed_test_case) {
                        statusClass = "text-red-500";
                        text += ": FAILED";
                      }

                      return (
                        <div
                          key={idx + 1}
                          className="p-2 border border-[#CAFF33] rounded-md"
                        >
                          <p className={statusClass}>{text}</p>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-row gap-4">
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter custom input..."
                  className="w-full h-[150px] p-3 bg-[#1C1C1C]/40 text-white rounded-lg resize-none focus:outline-none border border-[#CAFF33]"
                />

                <div className="w-full h-[120px] text-white orbitron text-sm sm:text-base md:text-lg p-4 overflow-y-auto bg-[#1C1C1C]/40 rounded-lg border border-[#CAFF33]">
                  <div>Output:</div>
                  <pre>{output ?? ""}</pre>
                </div>
              </div>
            )}
          </div>
          {/* Run & Submit buttons */}
          <div className="mt-10 flex gap-3 justify-end text-black font-bold text-xl">
            <button
              onClick={runCode}
              disabled={isRunning }
              className="w-[150px] h-[50px] bg-[#CAFF33] disabled:bg-[#7D9900] disabled:cursor-not-allowed border-2 border-[#CAFF33] rounded-md hover:bg-[#292929] hover:text-[#CAFF33] transition-colors shadow-md"
            >
              Run
            </button>
            <button
              onClick={submitCode}
              disabled={isSubmitting}
              className="w-[150px] h-[50px] border-2 rounded-md shadow-md flex items-center justify-center text-black font-bold transition-colors
      bg-[#CAFF33] border-[#CAFF33] hover:bg-[#292929] hover:text-[#CAFF33]
      disabled:bg-[#7D9900] disabled:cursor-not-allowed disabled:opacity-70"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default CodeEditor;
