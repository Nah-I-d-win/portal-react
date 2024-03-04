import { useState } from "react";
import { PaletteHandler } from "../../utils/colors";
import axiosInstance from "../axios";
import { FragmentRequest } from "../../models/fragment_request";
import axios from "axios";

const useFractalActions = (paletteHandler: PaletteHandler) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleAction = async (
        type: "move" | "cycle" | "palette",
        direction: string,
    ) => {
        setLoading(true);
        try {
            if (type === "palette") {
                paletteHandler[
                    direction === "previous"
                        ? "cyclePaletteBackward"
                        : "cyclePaletteForward"
                ]();
            } else {
                const response = await axiosInstance.post(`/api/fractal/${type}`, {
                    direction,
                });
                console.log(response.data);
            }
        } catch (error) {
            console.error(`Error handling ${type} action:`, error);
        } finally {
            setLoading(false);
        }
    };

    async function sendFragmentRequest() {
        try {
            const request: FragmentRequest = {
                worker_name: "cloudddddd",
                maximal_work_load: 100,
            };
            const body = JSON.stringify(request);
            const response = await axios.post(
                "https://48t54gy4p1.execute-api.eu-west-1.amazonaws.com/Prod/request",
                body,
            );

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return { loading, handleAction, sendFragmentRequest };
};

export default useFractalActions;
