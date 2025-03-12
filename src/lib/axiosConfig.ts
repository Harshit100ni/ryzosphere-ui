import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const axiosConfig = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for better error handling
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = "An unknown error occurred.";

    if (error.response) {
      // Use server-provided error message if available
      errorMessage =
        error.response.data?.message ||
        `Error ${error.response.status}: Unexpected error.`;
    } else if (error.request) {
      // Request was made but no response was received
      errorMessage = "No response from server. Please check your network.";
    } else {
      // Something happened in setting up the request
      errorMessage = `Request Error: ${error.message}`;
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosConfig;
