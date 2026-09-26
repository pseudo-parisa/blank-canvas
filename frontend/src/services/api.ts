import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default api;

export const getApiHealth = async () => {
    const response = await api.get("/");
    return response.data;
};