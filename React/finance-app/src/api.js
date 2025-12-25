import axios from 'axios';

const api = axios.create({
    //  baseURL: 'http://localhost:8000'
    baseURL : 'https://finance-app-p2nm.onrender.com'
});

export default api;