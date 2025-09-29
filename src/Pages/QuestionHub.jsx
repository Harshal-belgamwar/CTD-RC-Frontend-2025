import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const QuestionHub = () => {
  const [accuracy, setAccuracy] = useState([]);
  const navigate = useNavigate();

  // fetch questions from backend
  useEffect(() => {
    const getQuestions = async () => {
      const response = await axios.get(
        "http://localhost:3000/problems/accuracy",
        { withCredentials: true }
      );
      setAccuracy(response.data);
      
    };
    getQuestions();
  }, []);

  // mapping to code editor
  const handleQuestionClick = (problem_id) => {
    navigate("/codeeditor", { state: { problem_id } });
  };

  return (
    <div className="w-full min-h-screen bg-[#191919] flex flex-col">
      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>

      {/* Heading */}
      <div className="mt-[5%] text-center">
        <h1 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#CAFF33] via-[#8BC34A] to-[#CAFF33] text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider">
          QUESTION HUB
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#CAFF33] to-transparent mx-auto mt-4"></div>
      </div>

      {/* Grid */}
      <div className="w-full max-w-6xl mx-auto mt-[8rem] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 px-6 lg:px-12 mb-12 ">
        {Array.from({ length: 4 }).map((_, index) => {
          const accString = accuracy[index]?.accuracy || "0%";
          const acc = Math.round(parseFloat(accString.replace("%", "")));
          const fillPercent = acc / 100;

          return (
            <div
              key={index}
              className="relative p-[0.3rem] bg-[#2f2f2f] rounded-xl 
             transition-all duration-500 ease-out 
             hover:scale-[1.06] hover:-rotate-1 
             hover:shadow-[0_0_25px_rgba(202,255,51,0.6)] 
             hover:border-[#CAFF33] border border-transparent cursor-pointer"
              onClick={() => handleQuestionClick(accuracy[index]?.problem_id)}
            >
              <div
                className="relative w-full aspect-square flex justify-center items-center 
                  text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold 
                  bg-[#191919] border border-[#3D633F] rounded-xl overflow-hidden
                  transition-all duration-500"
              >
                {/* Water Fill */}
                <div
                  className="absolute bottom-0 left-0 w-full transition-all duration-700 ease-in-out"
                  style={{
                    height: `${fillPercent * 100}%`,
                    background: "#CAFF33",
                  }}
                ></div>

                {/* Question Number */}
                <span
                  className="z-10 font-black text-transparent bg-clip-text bg-gradient-to-r from-[#CAFF33] via-[#8BC34A] to-[#CAFF33] text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                     drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                >
                  {`Q${index + 1}`}
                </span>
              </div>

              {/* Accuracy Text */}
              <div className="mt-3 text-center">
                <span className="text-base sm:text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#CAFF33] via-[#8BC34A] to-[#7CB342]">
                  Accuracy: {acc}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionHub;