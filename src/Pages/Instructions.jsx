import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const instructionsData = [
  {
    number: "01",
    text: "There will be 4 problems in total.",
  },
  {
    number: "02",
    text: "Each problem will carry equal score.",
  },
  {
    number: "03",
    text: "There will be no penalty for wrong submissions.",
  },
  {
    number: "04",
    text: "Use of AI tools, external help, or any form of cheating is strictly prohibited. All codes will be checked for plagiarism – violators will be disqualified.",
  },
 
  {
    number: "05",
    text: "Exiting the full screen 3 times will log out the user automatically.",
  },
];

const InstructionItem = ({ number, text }) => {
  return (
    <div className=" w-[100%] h-[50%] bg-gradient-to-r from-[#CAFF33] to-[#292929] p-[2px] rounded-[50px] mx-auto">
      <div className="flex items-center gap-6 w-full h-full bg-[#191919] rounded-[50px]">
        <div className="flex-shrink-0 flex items-center justify-center bg-[#CAFF33] rounded-[50px] h-[98px] w-[100px]">
          <p className="text-[#292929] font-bold text-3xl">{number}</p>
        </div>
        <p className="text-white pr-10 text-lg">{text}</p>
      </div>
    </div>
  );
};

const Instructions = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#191919] tracking-wide">
      <Navbar />
      <div className="flex flex-col mt-[5%] items-center justify-center space-y-5">
        <h1 className=" text-5xl font-bold py-4 text-transparent bg-clip-text bg-gradient-to-r from-[#CAFF33] via-[#8BC34A] to-[#CAFF33]">INSTRUCTIONS</h1>
        <div className="w-full max-w-4xl space-y-4">
          {instructionsData.map((item) => (
            <InstructionItem
              key={item.number}
              number={item.number}
              text={item.text}
            />
          ))}
        </div>

        <Link to="/questionhub">
          <button className="text-[#191919] font-extrabold bg-[#CAFF33] border-[2px] border-[#4a5f12] mt-6 py-3 px-15 rounded-[50px] hover:text-[#CAFF33] hover:bg-[#191919] transition-colors cursor-pointer duration-300 text-xl">
            PROCEED
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Instructions;
