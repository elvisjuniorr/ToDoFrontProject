import axios from 'axios';

const api = axios.create({
  baseURL: "https://todobackendproject-of2h.onrender.com/",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;