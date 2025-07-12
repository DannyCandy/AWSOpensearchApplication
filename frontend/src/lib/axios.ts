import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000" : import.meta.env.VITE_API_CLOUDFRONT_URL,
	headers: {
		"Content-Type": "application/json",
	}
});