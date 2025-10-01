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
        // console.error("Error fetching result:", err);
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    };

    fetchData();
  }, []);


  return (
    <div className="h-[100vh] w-[100vw] bg-[#191919] box-border overflow-x-hidden">
      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>

      {/* RESULT Heading */}
      <div className="mt-[2.5%] w-full h-[63px] text-center text-transparent bg-clip-text bg-gradient-to-r from-[#CAFF33] via-[#8BC34A] to-[#CAFF33] font-bold text-6xl leading-[100%] text-[#FFFFFF] mx-auto tracking-wide">
        RESULT
      </div>

      <div className="w-full mt-[2.3%] flex flex-row justify-center items-center">
        {/* Left part */}
        <div className="h-full w-[50%] flex flex-col justify-center items-center gap-10">
          <img src={alien} alt="Alien" className="w-[23%] h-[23%]" />
          <div className="w-[363px] h-[53px] font-bold text-[45px] text-center text-[#FFFFFF] leading-[100%]">
             {`${result.username1} ${result.username2 ? `& ${result.username2}` : ""}`}
          </div>
          <div className="w-[229px] h-[64px] rounded-[30px] bg-[#CAFF33] flex justify-center items-center">
            <div className="w-fit h-fit font-bold text-[30px] leading-[100%] text-[#191919] text-center">
              {result.isjunior ? "JUNIOR" : "SENIOR"}
            </div>
          </div>
        </div>

        {/* Right part */}
        <div className="h-full w-[50%] grid grid-cols-2 gap-y-10 place-items-start">
          {/* Rank */}
          <div className="w-[300px] h-[219px] rounded-[20px] border-[2px] border-[#CAFF33] flex flex-col">
            <div className="w-full h-[60%] bg-[#CAFF33] rounded-t-[15px] flex items-center justify-center">
              <div className="font-bold text-7xl leading-[100%] text-center text-[#191919]">
                {result.rank||"-"}
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
                {result.total_score||"-"}
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
                {result.total_submissions||"-"}
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
                {result.accuracy || "-"}
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
