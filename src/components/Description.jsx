const Description = ({ Question }) => {
  return (
    <>
      {/* Title + Solved Badge */}
      <div className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-bold whitespace-pre-line">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFE7A3] to-[#B8832F] drop-shadow-[2px_2px_0_#0D1026]">
          {Question.title || "Untitled"}
        </h1>
        {localStorage.getItem(`solved_${Question.problem_id}`) && (
          <span className="text-[#FFE7A3] text-lg sm:text-xl font-semibold flex items-center gap-1">
            <span>✓</span> Solved
          </span>
        )}
      </div>

      {/* Points */}
      <p className="mt-3 text-lg sm:text-xl md:text-2xl text-[#e6d4b3] whitespace-pre-line">
        Points:{" "}
        <span className="text-[#FFE7A3] font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
          {Question.score || 0}
        </span>
      </p>

      {/* Description */}
      <div className="mt-4 p-4 rounded-lg bg-[#1a1625] border-2 border-[#c29673] shadow-md whitespace-pre-line">
        <h2 className="text-xl font-semibold text-[#FFE7A3] mb-2" style={{ fontFamily: "Cinzel, serif" }}>
          Description
        </h2>
        <p className="text-[#f3e3bf] leading-relaxed">
          {Question.description || "No description available."}
        </p>
      </div>

      {/* Input Format */}
      <div className="mt-4 p-4 rounded-lg bg-[#1a1625] border-2 border-[#c29673] shadow-md whitespace-pre-line">
        <h2 className="text-xl font-semibold text-[#FFE7A3] mb-2" style={{ fontFamily: "Cinzel, serif" }}>
          Input Format
        </h2>
        <pre className="text-[#f3e3bf] whitespace-pre-wrap font-mono">
          {Question.input_format || "N/A"}
        </pre>
      </div>

      {/* Output Format */}
      <div className="mt-4 p-4 rounded-lg bg-[#1a1625] border-2 border-[#c29673] shadow-md whitespace-pre-line">
        <h2 className="text-xl font-semibold text-[#FFE7A3] mb-2" style={{ fontFamily: "Cinzel, serif" }}>
          Output Format
        </h2>
        <pre className="text-[#f3e3bf] whitespace-pre-wrap font-mono">
          {Question.output_format || "N/A"}
        </pre>
      </div>

      {/* Constraints */}
      <div className="mt-4 p-4 rounded-lg bg-[#1a1625] border-2 border-[#c29673] shadow-md whitespace-pre-line">
        <h2 className="text-xl font-semibold text-[#FFE7A3] mb-2" style={{ fontFamily: "Cinzel, serif" }}>
          Constraints
        </h2>
        <pre className="text-[#f3e3bf] whitespace-pre-wrap font-mono">
          {Question.constraints || "N/A"}
        </pre>
      </div>
    </>
  );
};

export default Description;