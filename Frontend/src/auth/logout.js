import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const logout = () => {
    // console.log("hi ,I am logout!!");
    const navigate = useNavigate();
    useEffect(() => {
        const destroySession = async () => {
            const response = await axios.get("http://localhost:9999/customer/logout", {
                withCredentials: true
            });
            if (response.status) {
                // console.log(document.cookie.split("=")[0]);
                document.cookie = document.cookie.split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
            // console.log(response.status);
            if (response.status == 200) {
                navigate("/")

            }

        }
        destroySession();
    }, [])

}