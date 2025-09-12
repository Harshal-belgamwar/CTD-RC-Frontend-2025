import Navbar from "../components/Navbar";

const QuestionHub = () => {
  return (
    <div className="w-full min-h-screen bg-[#191919] flex flex-col">
      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>

      {/* Heading */}
      <h1 className="mt-[4%] font-bold text-white text-4xl sm:text-3xl md:text-5xl  text-center">
        QUESTION HUB
      </h1>

      {/* Fixed 2x3 Grid */}
      <div className="w-full max-w-4xl mx-auto mt-12 grid grid-cols-3 grid-rows-2 gap-[3rem] px-4 sm:px-6 lg:px-8 mb-7">
        {["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"].map((q) => (
          <div
            key={q}
            className="p-[0.2rem] bg-[#CAFF33] rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#CAFF33]/50 "
          >
            <div className="w-full font-bold aspect-square flex justify-center items-center text-white text-lg sm:text-xl md:text-2xl lg:text-3xl bg-[#191919] rounded-lg duration-300">
              {q}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionHub;
