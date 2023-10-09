import axios from "axios";

const instanceAxios = axios.create({
    baseURL: "http://localhost:80"
})

instanceAxios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${(window.localStorage.getItem("accessToken"))}`
    return config
})

export default instanceAxios
