import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import Loader from "./Loader";

const ReviewResult = ({ loading, review }) => {
  return (
    <div className="w-full lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 max-h-[100vh] overflow-y-auto">
      <div className="text-center text-2xl font-semibold border-b-2 mb-3 gradient-to-r from-blue-500 to-purple-600">
        Result
      </div>
      {loading ? <Loader /> : <Markdown rehypePlugins={[rehypeHighlight]} className="text-gray-300">{review}</Markdown>}
    </div>
  );
};

export default ReviewResult;
