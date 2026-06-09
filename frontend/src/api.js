import axios from 'axios';

const API = axios.create({ baseURL: 'https://campus-connect-api-91vv.onrender.com' })

// Har request se pehle token check karega (agar browser mein save hai toh)
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;