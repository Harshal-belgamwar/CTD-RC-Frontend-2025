import  { useState } from "react";
import SubmitCodeBox from "./SubmitCodeBox";

const Submissions = ({ userSubmissions }) => {
  const [selectedCode, setSelectedCode] = useState(null);
  const [selectedlanguage, setSelectedlanguage] = useState(null);

  return (
    <div className="space-y-4 ">
      {/* Header */}
      <h3 className="text-2xl font-bold text-[#CAFF33] oxanium">Submissions</h3>

      {/* Submission List */}
      <div className="space-y-3">
        {userSubmissions.length > 0 ? (
          userSubmissions.map((submission, index) => (
            <div
              key={index}
              onClick={() =>{ setSelectedCode(submission.code),setSelectedlanguage(submission.language)}}
              className="bg-[#1A1A1A] border border-[#CAFF33] rounded-lg p-4 cursor-pointer hover:bg-[#2A2A2A] transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Language Badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#CAFF33] text-black">
                  {submission.language}
                </span>

                {/* Status Badge */}
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    submission.result.toLowerCase().includes("pass") ||
                    submission.result.toLowerCase().includes("accepted") ||
                    submission.result.toLowerCase().includes("success")
                      ? "bg-[#CAFF33] text-black"
                      : submission.result.toLowerCase().includes("fail") ||
                        submission.result.toLowerCase().includes("reject") ||
                        submission.result.toLowerCase().includes("error")
                      ? "bg-red-600 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {submission.result}
                </span>

                {/* Timestamp */}
                <span className="oxanium text-sm text-[#CAFF33]">
                  {new Date(submission.submitted_at).toLocaleTimeString([], {
                    hour12: false,
                  })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-[#CAFF33]">
            <p className="text-lg">No submissions yet.</p>
            <p className="text-sm mt-2 text-[#CAFF33]/70">
              Your code submissions will appear here once you start solving problems.
            </p>
          </div>
        )}
      </div>

      {/* Code preview popup */}
      {selectedCode && (
        <SubmitCodeBox
          code={selectedCode} // pass code directly
          onClose={() => setSelectedCode(null)}
          Language={selectedlanguage}
        />
      )}
    </div>
  );
};

export default Submissions;
