import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchFeedbacks = (params?: any) =>
  API.get("/feedback", { params });

export const createFeedback = (data: {
  name: string;
  message: string;
}) => API.post("/feedback", data);

export const saveConfig = (data: any) =>
  API.post("/config", data);

export const getConfig = () =>
  API.get("/config");