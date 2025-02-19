import { useEffect, useState } from "react";
import "./App.css";
// import "primsjs/themes/prism-tomorrow.css"
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import axios from "axios";
import "highlight.js/styles/atom-one-dark.css";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  
  const BASE_URL = process.env.NODE_ENV === "production"
    ? "https://problem-solver-backend-a4hs.onrender.com"
    : "http://localhost:5000";

  useEffect(()=>{
    prism.highlightAll()
  },[])

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        setCode(fileContent);
      };
      reader.readAsText(file);
    }
  };

  const reviewCode = async()=>{
    setLoading(true)
    try {
      const response = await axios.post(`${BASE_URL}/ai/get-review`, { prompt: code });
      const result = response.data.replace(/<think>.*?<\/think>/gs, '')
      setReview(result)
      setLoading(false)
    } catch (error) {
      setError(error.message)
      console.log(error)
      setLoading(false)
    }
    
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 gap-6">
      {/* header */}
      <header className="w-full text-center text-3xl py-4 font-bold  bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
        AI code reviewer
      </header>
      {/* Error */}
      {error && (<header className="w-full text-center text-2xl py-3 text-black font-bold bg-gradient-to-r from-red-600 to-white rounded-lg">
        Opps! {error}
      </header>)}
      

      {/* sections */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl">
        <div className="w-full lg:w-1/2  h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 oveflow-auto">
          {/* file uplaod section */}
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".js,.py,.css,.java,.json,.html,.cpp,.ts,.jsx,.tsx,.cs,.c"
            className="text-sm mb-4 text-gray-400 bg-gray-700 rounded-lg cursor-pointer p-2"
          />

          {/* user input section */}
          <div className="border border-gray-600 rounded-lg p-4 bg-gray-900">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{fontFamily: "fire code monospace", fontSize: "16"}}
            ></Editor>
          </div>

          {/* ssubmit button */}

          <button className="w-full mt-4 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to to-purple-600 hover:from-purple-600 hover:to-blue-500 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
            onClick={reviewCode}
          >
            Review Code
          </button>
        </div>
        <div className="w-full lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 max-h-[100vh] overflow-y-auto">
          <div className=" text-center text-2xl font-semibold border-b-2 mb-3 gradient-to-r from-blue-500 to to-purple-600">Result</div>
          <div className="">
          {loading ? "Loading..." : <Markdown rehypePlugins={[rehypeHighlight]} className="text-gray-300">{review}</Markdown>}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
