import axios from 'axios';

const api = axios.create({
    baseURL:"https://post-media-backend.vercel.app/api/v1"
});

export default api;