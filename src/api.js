import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const askQuestion = async (question) => {
  const res = await API.post("/ask", {
    question: question,
  });
  return res.data.answer;
};
