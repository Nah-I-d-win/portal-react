import { useState } from "react";
import axiosInstance from "../axios";
import axios from "axios";
const useFractalActions = (paletteHandler) => {
    const [loading, setLoading] = useState(false);
    const handleAction = async (type, direction) => {
        setLoading(true);
        try {
            if (type === "palette") {
                paletteHandler[direction === "previous"
                    ? "cyclePaletteBackward"
                    : "cyclePaletteForward"]();
            }
            else {
                const response = await axiosInstance.post(`/api/fractal/${type}`, {
                    direction,
                });
                console.log(response.data);
            }
        }
        catch (error) {
            console.error(`Error handling ${type} action:`, error);
        }
        finally {
            setLoading(false);
        }
    };
    async function sendFragmentRequest() {
        try {
            const request = {
                worker_name: "cloudddddd",
                maximal_work_load: 100,
            };
            const body = JSON.stringify(request);
            console.log(import.meta.env);
            const response = await axios.post(import.meta.env.VITE_REACT_APP_REQUEST_URL, body);
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    }
    return { loading, handleAction, sendFragmentRequest };
};
export default useFractalActions;
