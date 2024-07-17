import axios from "axios";
import { toast } from "react-toastify";

// Function to refresh token
const refreshToken = async () => {
  try {
    const storedRefreshToken = localStorage.getItem("refreshToken");

    const response = await axios.post(
      "https://localhost:7071/api/authentication/refresh-token",
      { refreshToken: storedRefreshToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      return response.data.accessToken;
    } else {
      throw new Error("Unable to refresh token");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    toast.error("Session expired. Please log in again.", {
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
      className: "custom-toast",
    });
    // Optional: Navigate to login page or log out user
    localStorage.clear();
    window.location.href = "/login"; // Redirect to login page if token refresh fails
    return null;
  }
};

// Create axios instance with interceptors for token refreshing
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken") // Check if refreshToken exists
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        // Handle refresh token failure
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
