import { useState, useEffect } from "react";
import { ServerDto } from "../../models/server";
import { RenderingData } from "../../models/rendering_data";

export interface HoveredTile {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export const useMouseTracking = (
    canvasRef: React.RefObject<HTMLCanvasElement>,
    server: ServerDto | null,
    data: RenderingData[],
    calculateHoveredTile: ((x: number, y: number) => HoveredTile | null) | null,
) => {
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [hoveredTile, setHoveredTile] = useState<HoveredTile | null>(null);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (!canvasRef.current || !server) return;

            const { left, top } = canvasRef.current.getBoundingClientRect();
            const x = event.clientX - left;
            const y = event.clientY - top;

            setMousePosition({ x, y });
            setHoveredTile(null);
        };

        const canvas = canvasRef.current;
        canvas?.addEventListener("mousemove", handleMouseMove);

        return () => {
            canvas?.removeEventListener("mousemove", handleMouseMove);
        };
    }, [canvasRef, server, data, calculateHoveredTile]);

    return { mousePosition, hoveredTile };
};
