import { useState, useEffect } from "react";
import axios from "axios";
// import "./App.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Navbar from "../components/Navbar";

const backend_url=import.meta.env.VITE_API_URL;

const fetchStudents = async () => {
  try {
    const response = await axios.get(`${backend_url}/leaderboard/`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    console.log(response)

    // Transform backend response into frontend format
    return response.data.map((item) => ({
      username: item.teamname,
      scores: [item.problem_1, item.problem_2, item.problem_3, item.problem_4],
      total: item.total_score,
      time: new Date(item.last_submission_time).toLocaleTimeString(),
    }));
        // Transform backend response into frontend format
    return response.data.map((item) => ({
      username: item.username2
        ? `${item.username1} & ${item.username2}`
        : item.username1,
      scores: [item.problem_1, item.problem_2, item.problem_3, item.problem_4],
      total: item.total_score,
      time: new Date(item.last_submission_time).toLocaleTimeString(),
    }));
  } catch  {
   
    return [];
  }
};

function Leaderboard() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getStudents = async () => {
      const data = await fetchStudents();
      setStudents(data);
    };
    getStudents();
  }, []);

  // calculate total score
  const dataWithScores = students.map((s) => ({
    ...s,
    total: s.scores.reduce((a, b) => a + b, 0),
  }));

  // sort by score descending
  const sortedData = [...dataWithScores].sort((a, b) => b.total - a.total);

  // pagination
  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage)); // at least 1
  const startIndex = page * itemsPerPage;
  const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  // Handlers
  const handlePrev = () => {
    setPage((p) => Math.max(p - 1, 0));
  };

  const handleNext = () => {
    setPage((p) => Math.min(p + 1, totalPages - 1));
  };

  console.log("Leaderboard")
  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-[#191919] box-border overflow-x-hidden ">
        {/* Navbar */}
        <nav>
          <Navbar />
        </nav>

        <div className="mt-[2.1%] w-full text-center font-bold text-4xl md:text-5xl lg:text-[50px] text-[#FFFFFF] mx-auto tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#CAFF33] via-[#8BC34A] to-[#CAFF33]">
          LEADERBOARD
        </div>

        <div className="mt-10 w-[85%] min-h-[65%] border-2 rounded-3xl border-[#CAFF33] bg-[#1a1a1a]/70 backdrop-blur-sm flex flex-col mx-auto shadow-[0_0_20px_rgba(202,255,51,0.15)]">
          <table className="w-full table-fixed text-center text-white tracking-wide  overflow-hidden">
            <thead className="text-lg md:text-xl font-bold bg-[#CAFF33]/10">
              <tr className="border-b-2 border-[#CAFF33]">
                <th className="py-4 w-[10%]">RANK</th>
                <th className="w-[22%]">USERNAME</th>
                <th className="w-[7%]">Q1</th>
                <th className="w-[7%]">Q2</th>
                <th className="w-[7%]">Q3</th>
                <th className="w-[7%]">Q4</th>
                <th className="w-[13%]">TIME</th>
                <th className="w-[13%]">SCORE</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((student, idx) => (
                <tr
                  key={student.username}
                  className="text-base md:text-lg transition-all duration-300 hover:bg-[#CAFF33]/10 hover:scale-[1.01] cursor-pointer"
                >
                  <td className="py-5 font-semibold text-[#CAFF33]">
                    {startIndex + idx + 1}
                  </td>
                  <td className="font-bold text-white">
                    {student.username.toUpperCase()}
                  </td>
                  {student.scores.map((s, i) => (
                    <td key={i} className="text-gray-300">
                      {s}
                    </td>
                  ))}
                  <td className="text-gray-200">{student.time}</td>
                  <td className="font-bold text-xl text-[#CAFF33]">
                    {student.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="m-auto flex justify-center items-center gap-6 p-6">
            {/* Prev button */}
            <button
              onClick={handlePrev}
              disabled={page === 0}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border border-[#CAFF33]/60 transition-all duration-300
        ${
          page === 0
            ? "bg-[#CAFF33]/40 text-black cursor-not-allowed opacity-50"
            : "bg-[#CAFF33] text-black hover:bg-[#d5fc68] hover:shadow-[0_0_15px_rgba(202,255,51,0.7)] hover:scale-110"
        }`}
            >
              <FaArrowLeft />
            </button>

            <span className="text-white font-medium text-lg">
              {page + 1} / {totalPages}
            </span>

            {/* Next button */}
            <button
              onClick={handleNext}
              disabled={page === totalPages - 1}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border border-[#CAFF33]/60 transition-all duration-300
        ${
          page === totalPages - 1
            ? "bg-[#CAFF33]/40 text-black cursor-not-allowed opacity-50"
            : "bg-[#CAFF33] text-black hover:bg-[#d5fc68] hover:shadow-[0_0_15px_rgba(202,255,51,0.7)] hover:scale-110"
        }`}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leaderboard;
