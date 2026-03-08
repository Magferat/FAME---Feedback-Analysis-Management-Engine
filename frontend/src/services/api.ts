import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://fame-feedback-analysis-management-engine.onrender.com/api",

});

export const fetchFeedbacks = (params?: any) =>
  API.get("/feedback", { params });

export const createFeedback = (data: {
  name: string;
  message: string;
}) => API.post("/feedback", data);