import { useState } from "react";
import Header from "./Header";
import FileUploader from "./FileUploader";

import ReviewResult from "./ReviewResult";
import { reviewCodeAPI } from "../utils/api";
import CodeEditor from "./CodeEditore";

function AIReviewer() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reviewCode = async () => {
    if (!code.trim()) {
      setError("Please enter or upload some code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await reviewCodeAPI(code);
      setReview(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 gap-6">
      <Header title="AI Code Reviewer" />
      {error && <Header title={`❌ Error: ${error}`} className="bg-red-600 text-white text-lg" />}
      
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          <FileUploader onFileRead={setCode} />
          <CodeEditor code={code} setCode={setCode} />
          <button
            className="w-full mt-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
            onClick={reviewCode}
          >
            Review Code
          </button>
        </div>
        
        {/* Right Section */}
        <ReviewResult loading={loading} review={review} />
      </div>
    </div>
  );
}

export default AIReviewer;
