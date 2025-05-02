// api/tasks.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTasks = async () => {
  const response = await axiosInstance.get("/tasks");
  return response.data;
};

export const createTask = async (task: any) => {
  const response = await axiosInstance.post("/tasks", task);
  return response.data;
};

export const updateTask = async (id: string, task: any) => {
  const response = await axiosInstance.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};
