import axios from "axios"
import useAuth from "../context/Authcontext"

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true
})



export default api;


// api.interceptors.response.use(
//     response => response,
//     async error => {
//         const originalrequest = error.config;

//         const msg = error.response?.data?.message;

//         //If the request was to refresh-token itself, don’t try again:
//         // if (originalrequest.url?.includes("/users/refresh-token")) {
//         //     return Promise.reject(error);
//         // }
//         const url = originalrequest.url || "";

//         // 1️ Never auto‐refresh on these endpoints
//         if (
//             url.includes("/users/refresh-token") ||
//             url.includes("/users/login") ||
//             url.includes("/users/signup")
//         ) {
//             return Promise.reject(error);
//         }

//         if (error.response?.status === 401 && !originalrequest._retry) {
//             originalrequest._retry = true;
//             try {
//                 // 3️⃣ Try refreshing the access token
//                 await api.post("/users/refresh-token");
//                 // 4️⃣ Retry the original request
//                 return api(originalrequest);
//             } catch (refreshErr) {
//                 // 5️⃣ If that fails, redirect to login
//                 // window.location.href = "/login";
//                 return Promise.reject(refreshErr);

//             }
//         }

//         // if (error.response?.status === 401 && !originalrequest._retry) {
//         // if (error.response?.status === 401 && msg === "Access token expired" && !original._retry) {

//         //     originalrequest._retry = true;

//         //     try {
//         //         await api.post("/users/refresh-token")
//         //         return api(originalrequest);
//         //     } catch (refreshErr) {
//         //         window.location.href = "/login";
//         //         return Promise.reject(refreshErr);
//         //     }

//         // }

//         // 6) For any other error (including other 401 reasons), just forward it
//         return Promise.reject(error);
//     }
// )
