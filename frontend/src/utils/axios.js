import axios from "axios";
// const dotenv = require("dotenv");
// dotenv.config();

export const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ? "" : "http://18.191.138.50:8080",
    //    baseURL: import.meta.env.PROD ? "" : "http://localhost:8080",
});

export const testInstance = axios.create({
    baseURL: import.meta.env.PROD ? "" : "http://localhost:8080",
});

axiosInstance.interceptors.request.use(
    function (config) {
        config.headers.Authorization =
            "Bearer " + localStorage.getItem("accessToken");
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.data === "jwt expired") {
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
