import { useState, useEffect } from "react";
export const useMouseTracking = (canvasRef, server, data, calculateHoveredTile) => {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    });
    const [hoveredTile, setHoveredTile] = useState(null);
    useEffect(() => {
        const handleMouseMove = (event) => {
            if (!canvasRef.current || !server)
                return;
            const { left, top } = canvasRef.current.getBoundingClientRect();
            const x = event.clientX - left;
            const y = event.clientY - top;
            setMousePosition({ x, y });
            setHoveredTile(calculateHoveredTile(x, y));
        };
        const canvas = canvasRef.current;
        canvas?.addEventListener("mousemove", handleMouseMove);
        return () => {
            canvas?.removeEventListener("mousemove", handleMouseMove);
        };
    }, [canvasRef, server, data, calculateHoveredTile]);
    return { mousePosition, hoveredTile };
};
