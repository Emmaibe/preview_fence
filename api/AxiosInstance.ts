import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://pf-ar-backend-qzun.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});


