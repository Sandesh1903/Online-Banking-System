import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

let isAxiosInterceptorConfigured = false;

export const AxiosInterceptor = () => {
    const navigate = useNavigate();
    const onFulfilled = (response) => {
        console.log("inside success");
        return Promise.resolve(response);
    }
    const onRejected = (error) => {
        console.log("inside reject");
        if (error.status == 401) {
            toast.error("Unauthorized Please login");
            navigate("/");
        }
        if (error.status == 404) {
            toast.error(error.response.data);
        }
        return Promise.reject(error);
    }
    if (!isAxiosInterceptorConfigured) {
        axios.interceptors.response.use(onFulfilled, onRejected);
        isAxiosInterceptorConfigured = true;
    }

    // axios.interceptors.request.use((request) => {
    //     console.log(request.url, "hii");
    //     if (request.url.includes("/login")) {
    //         console.log("hi");
    //         logout();
    //     }
    //     return Promise.resolve(request);

    // }, (error) => {
    //     return Promise.reject(error);
    // })
}
