import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: "https://dummyjson.com/auth",
    // baseURL: "https://api.developbetterapps.com",
    baseURL: "https://pf-ar-backend.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});


