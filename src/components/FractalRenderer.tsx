import React, { useCallback, useEffect, useRef, useState } from "react";
import { RenderingData } from "../models/rendering_data";
import { color } from "../fractals/fractal";
import { ServerDto, Range } from "../models/server";

interface FractalRendererProps {
    width?: number;
    height?: number;
    data?: RenderingData[];
    server?: ServerDto | null;
}

interface HoveredTile {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

const FractalRenderer: React.FC<FractalRendererProps> = ({
    width,
    height,
    data,
    server,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hoveredWorker, setHoveredWorker] = useState<string | null>(null);
    const [hoveredTile, setHoveredTile] = useState<HoveredTile | null>(null);
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    const draw = useCallback(
        (context: CanvasRenderingContext2D) => {
            if (!data) return;
            const canvas = canvasRef.current;
            if (!canvas) return;
            if (!server) return;

            data.forEach((d) => {
                const { result, iterations } = d;
                const { resolution } = result;
                const [startX, startY] = startPoint(
                    result.range,
                    server,
                    width ?? canvas.width,
                    height ?? canvas.height,
                );

                const imageData = context.createImageData(resolution.nx, resolution.ny);

                for (let y = 0; y < resolution.ny; ++y) {
                    for (let x = 0; x < resolution.nx; ++x) {
                        const t = iterations[y * resolution.nx + x]; // Ensure using nx for indexing
                        const [r, g, b] = color(t); // Assuming color() returns [r, g, b]
                        const index = (x + y * resolution.nx) * 4;
                        imageData.data[index] = r;
                        imageData.data[index + 1] = g;
                        imageData.data[index + 2] = b;
                        imageData.data[index + 3] = 255;
                    }
                }

                context.putImageData(imageData, startX, startY);

                if (hoveredTile) {
                    context.strokeStyle = "red"; // Choose a color for the square
                    context.lineWidth = 2; // Set the line width
                    context.strokeRect(
                        hoveredTile.startX,
                        hoveredTile.startY,
                        hoveredTile.endX - hoveredTile.startX,
                        hoveredTile.endY - hoveredTile.startY,
                    );
                }
            });
        },
        [data, height, width, hoveredTile, server],
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d", { willReadFrequently: true });
        if (context) {
            draw(context);
        }

        const handleMouseMove = (event: MouseEvent) => {
            if (!canvas || !data) return;
            if (!server) return;

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setMousePosition({ x: event.clientX, y: event.clientY });

            let hovered = null;
            let hoveredTile: HoveredTile | null = null;
            data.forEach((d) => {
                const { result } = d;
                const [startX, startY] = startPoint(
                    result.range,
                    server,
                    width ?? canvas.width,
                    height ?? canvas.height,
                );
                const endX = startX + result.resolution.nx;
                const endY = startY + result.resolution.ny;

                if (x >= startX && x <= endX && y >= startY && y <= endY) {
                    hovered = d.worker;
                    hoveredTile = { startX, startY, endX, endY };
                }
            });

            setHoveredWorker(hovered);
            setHoveredTile(hoveredTile);
        };

        canvas?.addEventListener("mousemove", handleMouseMove);

        return () => {
            canvas?.removeEventListener("mousemove", handleMouseMove);
        };
    }, [draw, data, width, height, server]);

    return (
        <>
            <canvas ref={canvasRef} width={width} height={height} />
            {hoveredWorker && (
                <div
                    className="absolute p-2 bg-gray-700 text-white text-sm rounded-lg shadow"
                    style={{ left: mousePosition.x, top: mousePosition.y }}
                >
                    {hoveredWorker}
                </div>
            )}
        </>
    );
};

function startPoint(
    range: Range,
    server: ServerDto,
    width: number,
    height: number,
): [number, number] {
    const x =
        ((range.min.x - server.range.min.x) /
            (server.range.max.x - server.range.min.x)) *
        width;

    const y =
        ((range.min.y - server.range.min.y) /
            (server.range.max.y - server.range.min.y)) *
        height;

    return [x, y];
}

export default FractalRenderer;
