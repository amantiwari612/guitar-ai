import axios, { AxiosError } from "axios";

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, success: boolean) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(true);
        }
    });

    failedQueue = [];
};

API.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest: any = error.config;

        if (!error.response) {
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/auth/login") &&
            !originalRequest.url?.includes("/auth/register")
        ) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve,
                        reject,
                    });
                }).then(() => API(originalRequest));
            }
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await API.post("/auth/refresh-token");

                processQueue(null, true);
                isRefreshing = false;

                return API(originalRequest);
            } catch (err) {
                processQueue(err, false);
                isRefreshing = false;

                window.location.href = "/login";

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
)