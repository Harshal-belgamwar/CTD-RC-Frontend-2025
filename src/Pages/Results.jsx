import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import alien from "../assets/alien.png";

function Results() {
  const [result, setResult] = useState({
    name: "",
    level: "",
    rank: 0,
    score: 0,
    totalSubmissions: 0,
    accuracy: 0,
  });

  useEffect(() => {
    // Replace with your backend API URL
    axios
      .get("http://localhost:5000/api/result")
      .then((res) => setResult(res.data))
      .catch((err) => console.error("Error fetching result:", err));
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] bg-[#191919] box-border overflow-x-hidden">
      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>

      {/* RESULT Heading */}
      <div className="mt-[2.5%] w-full h-[63px] text-center font-bold text-6xl leading-[100%] text-[#FFFFFF] mx-auto tracking-wide">
        RESULT
      </div>

      <div className="w-full mt-[2.3%] flex flex-row justify-center items-center">
        {/* Left part */}
        <div className="h-full w-[50%] flex flex-col justify-center items-center gap-10">
          <img src={alien} alt="Alien" className="w-[23%] h-[23%]" />
          <div className="w-[363px] h-[53px] font-bold text-[45px] text-center text-[#FFFFFF] leading-[100%]">
            {result.name || "Loading Name..."}
          </div>
          <div className="w-[229px] h-[64px] rounded-[30px] bg-[#CAFF33] flex justify-center items-center">
            <div className="w-fit h-fit font-bold text-[30px] leading-[100%] text-[#191919] text-center">
              {result.level || "Unknown"}
            </div>
          </div>
        </div>

        {/* Right part */}
        <div className="h-full w-[50%] grid grid-cols-2 gap-y-10 place-items-start">
          {/* Rank */}
          <div className="w-[300px] h-[219px] rounded-[20px] border-[2px] border-[#CAFF33] flex flex-col">
            <div className="w-full h-[60%] bg-[#CAFF33] rounded-t-[15px] flex items-center justify-center">
              <div className="font-bold text-7xl leading-[100%] text-center text-[#191919]">
                {result.rank}
              </div>
            </div>
            <div className="w-full h-[40%] flex items-center justify-center">
              <div className="font-bold text-3xl leading-[100%] text-center text-[#FFFFFF]">
                RANK
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="w-[300px] h-[219px] rounded-[20px] border-[2px] border-[#CAFF33] flex flex-col">
            <div className="w-full h-[60%] bg-[#CAFF33] rounded-t-[15px] flex items-center justify-center">
              <div className="font-bold text-7xl leading-[100%] text-center text-[#191919]">
                {result.score}
              </div>
            </div>
            <div className="w-full h-[40%] flex items-center justify-center">
              <div className="font-bold text-3xl leading-[100%] text-center text-[#FFFFFF]">
                SCORE
              </div>
            </div>
          </div>

          {/* Total Submissions */}
          <div className="w-[300px] h-[219px] rounded-[20px] border-[2px] border-[#CAFF33] flex flex-col">
            <div className="w-full h-[60%] bg-[#CAFF33] rounded-t-[15px] flex items-center justify-center">
              <div className="font-bold text-7xl leading-[100%] text-center text-[#191919]">
                {result.totalSubmissions}
              </div>
            </div>
            <div className="w-full h-[40%] flex items-center justify-center">
              <div className="font-bold text-2xl leading-[120%] text-center text-[#FFFFFF]">
                TOTAL
                <br />
                SUBMISSIONS
              </div>
            </div>
          </div>

          {/* Accuracy */}
          <div className="w-[300px] h-[219px] rounded-[20px] border-[2px] border-[#CAFF33] flex flex-col">
            <div className="w-full h-[60%] bg-[#CAFF33] rounded-t-[15px] flex items-center justify-center">
              <div className="font-bold text-6xl leading-[100%] text-center text-[#191919]">
                {result.accuracy || "100"}%
              </div>
            </div>
            <div className="w-full h-[40%] flex items-center justify-center">
              <div className="font-bold text-3xl leading-[100%] text-center text-[#FFFFFF]">
                ACCURACY
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
