import axios from 'axios';

axios.interceptors.request.use(
    config => {
        config.headers.Authorization = localStorage.getItem('token');
        return config;
    },
    error => Promise.reject(error)
)

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && [401].includes(error.response.status)) {
            console.error(`Redirecting to login by 4xx response!`);
            localStorage.removeItem("token");
            localStorage.removeItem("profile");

            if (window.location.pathname !== "/")
                return window.location.href = "/";
        }

        return Promise.reject(error);
    }
)

export default axios;