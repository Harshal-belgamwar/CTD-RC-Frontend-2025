const Description = ({ Question }) => {
  return (
    <>
      {/* Title + Solved Badge */}
      <div className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-bold text-[#CAFF33] whitespace-pre-line">
        <h1>{Question.title || "Untitled"}</h1>
        {localStorage.getItem(`solved_${Question.problem_id}`) && (
          <span className="text-green-400 text-lg sm:text-xl">✔ Solved</span>
        )}
      </div>

      {/* Points */}
      <p className="mt-3 text-lg sm:text-xl md:text-2xl text-gray-300 whitespace-pre-line">
         Points:{" "}
        <span className="text-yellow-400 font-semibold">
          {Question.score || 0}
        </span>
      </p>

      {/* Description */}
      <div className="mt-4 p-4 rounded-lg bg-[#1C1C1C]/60 border border-[#CAFF33]/40 whitespace-pre-line">
        <h2 className="text-xl font-semibold text-[#CAFF33] mb-2">
           Description
        </h2>
        <p className="text-gray-200 leading-relaxed">
          {Question.description || "No description available."}
        </p>
      </div>

      {/* Input Format */}
      <div className="mt-4 p-4 rounded-lg bg-[#1C1C1C]/60 border border-blue-400/40 whitespace-pre-line">
        <h2 className="text-xl font-semibold text-blue-400 mb-2">
           Input Format
        </h2>
        <pre className="text-gray-200 whitespace-pre-wrap font-mono">
          {Question.input_format || "N/A"}
        </pre>
      </div>

      {/* Output Format */}
      <div className="mt-4 p-4 rounded-lg bg-[#1C1C1C]/60 border border-purple-400/40 whitespace-pre-line">
        <h2 className="text-xl font-semibold text-purple-400 mb-2">
           Output Format
        </h2>
        <pre className="text-gray-200 whitespace-pre-wrap font-mono">
          {Question.output_format || "N/A"}
        </pre>
      </div>

      {/* Constraints */}
      <div className="mt-4 p-4 rounded-lg bg-[#1C1C1C]/60 border border-red-400/40 whitespace-pre-line">
        <h2 className="text-xl font-semibold text-red-400 mb-2">
           Constraints
        </h2>
        <pre className="text-gray-200 whitespace-pre-wrap font-mono">
          {Question.constraints || "N/A"}
        </pre>
      </div>
    </>
  );
};

export default Description;
