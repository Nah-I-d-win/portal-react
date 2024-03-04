import { useRef, useEffect } from "react";
export const useCanvas = (draw, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
dependencies) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (context) {
            draw(context);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draw, ...dependencies]);
    return canvasRef;
};
