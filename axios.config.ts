import axios from 'axios';

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            return error.response;
        }
        return Promise.reject(error);
    }
);

export default axios;
