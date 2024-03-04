import { useCallback } from "react";
import { PaletteHandler } from "../utils/colors";
import { Camera } from "lucide-react";
import { color } from "../fractals/fractal";
import { RenderingData } from "../models/rendering_data";
import { ServerDto } from "../models/server";
import { useCanvas } from "../app/hooks/useCanvas";
import { useMouseTracking } from "../app/hooks/useMouseTracking";
import { saveCanvasAsImage, startPoint } from "../utils/canvasHelper";

interface FractalRendererProps {
    width?: number;
    height?: number;
    data?: RenderingData[];
    server?: ServerDto | null;
    paletteHandler?: PaletteHandler;
}

const FractalRenderer: React.FC<FractalRendererProps> = ({
    width = 800,
    height = 600,
    data = [],
    server,
    paletteHandler,
}) => {
    const draw = useCallback(
        (context: CanvasRenderingContext2D) => {
            if (!server || !paletteHandler) return;
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
                        const t = iterations[y * resolution.nx + x];
                        const [r, g, b] = paletteHandler?.calculateColor(t) ?? color(t);
                        const index = (x + y * resolution.nx) * 4;
                        imageData.data[index] = r;
                        imageData.data[index + 1] = g;
                        imageData.data[index + 2] = b;
                        imageData.data[index + 3] = 255;
                    }
                }

                context.putImageData(imageData, startX, startY);

                if (hoveredTile) {
                    context.strokeStyle = "red";
                    context.lineWidth = 2;
                    context.strokeRect(
                        hoveredTile.startX,
                        hoveredTile.startY,
                        hoveredTile.endX - hoveredTile.startX,
                        hoveredTile.endY - hoveredTile.startY,
                    );
                }
            });
        },
        [data, server, paletteHandler],
    );

    const canvasRef = useCanvas(draw, [
        data,
        server,
        paletteHandler,
        width,
        height,
    ]);

    const { mousePosition, hoveredTile } = useMouseTracking(
        canvasRef,
        server ?? null,
        data,
        null,
    );

    const handleSaveImageClick = async () => {
        if (!canvasRef.current) return;
        await saveCanvasAsImage(
            canvasRef.current,
            "https://48t54gy4p1.execute-api.eu-west-1.amazonaws.com/Prod/save-image",
        );
    };

    return (
        <>
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className="rounded-lg shadow-lg"
            />
            {hoveredTile && (
                <div
                    className="absolute p-2 bg-gray-700 text-white text-sm rounded-lg shadow"
                    style={{ left: mousePosition.x, top: mousePosition.y }}
                ></div>
            )}
            <div
                onClick={handleSaveImageClick}
                className="fixed bottom-10 right-10 bg-blue-500 p-3 rounded-full hover:bg-blue-400 cursor-pointer"
            >
                <Camera color="white" size={32} />
            </div>
        </>
    );
};

export default FractalRenderer;
