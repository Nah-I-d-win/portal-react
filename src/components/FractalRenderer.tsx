import React, { useCallback, useEffect, useRef } from "react";
import { RenderingData } from "../models/rendering_data";
import { Range } from "../models/fragment_result";
import { color } from "../fractals/fractal";

interface FractalRendererProps {
    width?: number;
    height?: number;
    data?: RenderingData[];
}

const FractalRenderer: React.FC<FractalRendererProps> = ({
    width,
    height,
    data,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = width ?? window.innerWidth;
        canvas.height = height ?? window.innerHeight;
    }, [width, height]);

    const draw = useCallback(
        (context: CanvasRenderingContext2D) => {
            if (!data) return;

            data.forEach((d) => {
                const { result, iterations } = d;
                const { resolution } = result;
                const [startX, startY] = startPoint(result.range, canvasRef.current);

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
            });
        },
        [data],
    );

    useEffect(() => {
        resizeCanvas();
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d", { willReadFrequently: true });
        if (context) {
            draw(context);
        }
    }, [resizeCanvas, draw]);

    return <canvas ref={canvasRef} />;
};

function startPoint(
    range: Range,
    canvas?: HTMLCanvasElement | null,
): [number, number] {
    if (!canvas) return [0, 0];
    // Adjust these calculations according to how you want to map the fractal's range to the canvas size
    const x = ((range.min.x - -1.2) / (1.2 - -1.2)) * canvas.width;
    const y = ((range.min.y - -1.2) / (1.2 - -1.2)) * canvas.height;

    return [x, y];
}

export default FractalRenderer;
