import axios from "axios";

const BASE_URL = process.env.NODE_ENV === "production"
  ? "https://problem-solver-backend-a4hs.onrender.com"
  : "http://localhost:5000";

export const reviewCodeAPI = async (code) => {
  try {
    const response = await axios.post(`${BASE_URL}/ai/get-review`, { prompt: code });
    return response.data.replace(/<think>.*?<\/think>/gs, '');
  } catch (error) {
    throw new Error(error.message);
  }
};
