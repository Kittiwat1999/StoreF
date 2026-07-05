// axiosClient.ts
import axios from "axios";
import toast from "react-hot-toast";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // send cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.log("Error:", error);
      const status = error.response.status;

      if (status === 401) {
        // Unauthorized
        toast.error("Unauthorized, redirect to login");
        window.location.href = "/login";
      } else if (status === 403) {
        // Forbidden
        toast.error("Forbidden, no permission");
      } else if (status === 500) {
        // Server error
        toast.error("Server error, try again later");
      }
    } else {
      toast.error("Network error or server not reachable");
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
