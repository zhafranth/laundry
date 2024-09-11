import axios from "axios";
import { toast } from "react-toastify";

export interface ApiResponse<T> {
  data: {
    data: T;
    message: string;
    total?: number;
  };
  message?: string;
  status?: number;
}

const apiRequest = axios.create({
  baseURL: "/api",
  headers: {
    "Cache-Control": "no-cache",
  },
});

apiRequest.interceptors.response.use(
  (response) => response,
  () => {
    return toast.error("API Error 400");
  }
);

export default apiRequest;
