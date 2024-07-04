import axios from "axios";
import { toast } from "react-toastify";

// Hàm làm mới token
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
    window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập nếu làm mới token thất bại
    return null;
  }
};

// Tạo instance của axios với interceptor để làm mới token
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
      localStorage.getItem("refreshToken") // Thêm điều kiện kiểm tra refreshToken
    ) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
