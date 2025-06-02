import axios from "axios";
import {useAuthStore} from "@/stores/authStore";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const axiosInstance = axios.create({
	baseURL,
	timeout: 5000,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = useAuthStore.getState().token;
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export default axiosInstance;
