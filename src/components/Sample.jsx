

const Sample = ({ samples }) => {
  return (
    <>
      {samples.map((item, index) => (
        <div key={index} className="flex flex-row gap-6 mb-6">
          {/* Input Box */}
          <div className="flex-1  p-4 rounded-lg bg-[#0C091F]/80 font-play">
            <strong className="text-[#CAFF33] text-lg font-play">Input:</strong>
            <pre className="whitespace-pre-wrap text-[#FFFF99] mt-2 font-play">
              {item.input.replace(/\\n/g, "\n")}
            </pre>
          </div>

          {/* Output Box */}
          <div className="flex-1  p-4 rounded-lg bg-[#0C091F]/80 font-play">
            <strong className="text-[#FF5733] text-lg font-play">Output:</strong>
            <pre className="whitespace-pre-wrap text-[#FFFF99] mt-2 font-play">
              {item.output.replace(/\\n/g, "\n")}
            </pre>
          </div>
        </div>
      ))}
    </>
  );
};

export default Sample;
