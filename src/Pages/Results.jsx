import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import alien from "../assets/alien.png";
import { toast } from "react-toastify";

const backend_url = import.meta.env.VITE_API_URL;

function Results() {
  const [result, setResult] = useState({
    event_id: 2,
    team_id: 0,
    username1: "",
    username2: null,
    isjunior: false,
    level: "",
    rank: 0,
    total_score: 0,
    totalSubmissions: 0,
    accuracy: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${backend_url}/result/`, { withCredentials: true });
        setResult(res.data);
      } catch (err) {
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    };

    fetchData();
  }, []);

  // Format accuracy to show percentage
  const formattedAccuracy = result.accuracy ? `${result.accuracy}%` : "-";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#2a1f33] via-[#4b3140] to-[#9b6b5e] box-border overflow-x-hidden">
      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>

      {/* RESULT Heading */}
      <div className="mt-[2.5%] w-full text-center">
        <h1
          className="
            text-5xl md:text-6xl lg:text-7xl
            font-extrabold 
           
            bg-gradient-to-b from-[#FFE7A3] via-[#E6B65C] to-[#B8832F]
            bg-clip-text text-transparent
            [-webkit-text-stroke:1px_#1B1F4A]
            drop-shadow-[4px_4px_0_#0D1026]
            inline-block
          "
          style={{ fontFamily: "Cinzel, serif" }}
        >
          RESULT
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full mt-[5%] px-4 lg:px-8 flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
        {/* Left part - User Info */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center items-center gap-6">
          {/* Alien Image with hover effect */}
          <img
            src={alien}
            alt="Alien"
            className="w-[30%] lg:w-[35%] mx-auto hover:scale-105 transition-transform duration-300"
          />

          {/* Username */}
          <div
            className="
              text-2xl md:text-3xl lg:text-4xl
              font-bold text-center
              text-[#FFE7A3]
              drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]
              hover:text-white
              transition-colors duration-300
            "
            style={{ fontFamily: "Cinzel, serif" }}
          >
            {`${result.username1} ${result.username2 ? `& ${result.username2}` : ""}`}
          </div>

          {/* Junior/Senior Badge with hover effect */}
          <div className="w-[180px] md:w-[200px] h-[45px] md:h-[50px] rounded-[30px] bg-gradient-to-r from-[#E6B65C] to-[#B8832F] flex justify-center items-center border-2 border-[#FFE7A3] hover:from-[#FFE7A3] hover:to-[#E6B65C] hover:scale-105 transition-all duration-300">
            <span
              className="font-bold text-xl md:text-2xl text-[#0E0D40]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              {result.isjunior ? "JUNIOR" : "SENIOR"}
            </span>
          </div>
        </div>

        {/* Right part - Stats Cards */}
        <div className="w-full lg:w-[50%] grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 place-items-center">
          {/* Rank Card */}
          <div className="w-full max-w-[280px] h-[180px] md:h-[200px] rounded-[20px] border-2 border-[#c29673] bg-[#1a1625]/90 overflow-hidden hover:scale-105 hover:border-[#FFE7A3] hover:shadow-[0_0_20px_rgba(202,150,115,0.3)] transition-all duration-300">
            <div className="w-full h-[60%] bg-gradient-to-br from-[#E6B65C] to-[#B8832F] flex items-center justify-center">
              <div className="font-bold text-5xl md:text-6xl text-center text-[#0E0D40]">
                {result.rank || "-"}
              </div>
            </div>
            <div className="w-full h-[40%] flex items-center justify-center">
              <span
                className="font-bold text-xl md:text-2xl text-[#FFE7A3]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                RANK
              </span>
            </div>
          </div>

          {/* Score Card */}
          <div className="w-full max-w-[280px] h-[180px] md:h-[200px] rounded-[20px] border-2 border-[#c29673] bg-[#1a1625]/90 overflow-hidden hover:scale-105 hover:border-[#FFE7A3] hover:shadow-[0_0_20px_rgba(202,150,115,0.3)] transition-all duration-300">
            <div className="w-full h-[60%] bg-gradient-to-br from-[#E6B65C] to-[#B8832F] flex items-center justify-center">
              <div className="font-bold text-5xl md:text-6xl text-center text-[#0E0D40]">
                {result.total_score || "-"}
              </div>
            </div>
            <div className="w-full h-[40%] flex items-center justify-center">
              <span
                className="font-bold text-xl md:text-2xl text-[#FFE7A3]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                SCORE
              </span>
            </div>
          </div>

          {/* Total Submissions Card */}
          <div className="w-full max-w-[280px] h-[180px] md:h-[200px] rounded-[20px] border-2 border-[#c29673] bg-[#1a1625]/90 overflow-hidden hover:scale-105 hover:border-[#FFE7A3] hover:shadow-[0_0_20px_rgba(202,150,115,0.3)] transition-all duration-300">
            <div className="w-full h-[60%] bg-gradient-to-br from-[#E6B65C] to-[#B8832F] flex items-center justify-center">
              <div className="font-bold text-5xl md:text-6xl text-center text-[#0E0D40]">
                {result.total_submissions || "-"}
              </div>
            </div>
            <div className="w-full h-[40%] flex items-center justify-center">
              <span
                className="font-bold text-lg md:text-xl text-[#FFE7A3] text-center leading-tight"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                TOTAL
                <br />
                SUBMISSIONS
              </span>
            </div>
          </div>

          {/* Accuracy Card */}
          <div className="w-full max-w-[280px] h-[180px] md:h-[200px] rounded-[20px] border-2 border-[#c29673] bg-[#1a1625]/90 overflow-hidden hover:scale-105 hover:border-[#FFE7A3] hover:shadow-[0_0_20px_rgba(202,150,115,0.3)] transition-all duration-300">
            <div className="w-full h-[60%] bg-gradient-to-br from-[#E6B65C] to-[#B8832F] flex items-center justify-center">
              <div className="font-bold text-5xl md:text-6xl text-center text-[#0E0D40]">
                {formattedAccuracy}
              </div>
            </div>
            <div className="w-full h-[40%] flex items-center justify-center">
              <span
                className="font-bold text-xl md:text-2xl text-[#FFE7A3]"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                ACCURACY
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;