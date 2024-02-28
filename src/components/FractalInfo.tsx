import React from "react";
import { RenderingData } from "../models/rendering_data";
import { ServerDto } from "../models/server";

interface FractalInfoProps {
    server: ServerDto;
    data?: RenderingData[];
}

const FractalInfo: React.FC<FractalInfoProps> = ({ server, data }) => {
    return (
        <div className="space-y-2">
            <div className="text-gray-400">Fractal Info:</div>
            <div className="text-gray-300">
                <span>Type: {server.currentFractal}</span>
            </div>
            <div className="text-gray-300">
                <span>Color Scheme: {"inferno"}</span>
            </div>
            <div className="text-gray-300">
                <span>View Range: </span>
                <span className="text-indigo-400">
                    [{server.range.min.x.toFixed(2)}, {server.range.min.y.toFixed(2)}] to
                    [{server.range.max.x.toFixed(2)}, {server.range.max.y.toFixed(2)}]
                </span>
            </div>
            <div className="text-gray-300">
                <span>Tiles Received: {data ? data.length : 0}</span>
            </div>
            <div className="text-gray-300">
                <span>Workers: </span>
                <ul className="mt-1">
                    {Object.entries(server.workers).slice(0, 5).map(([key, worker], index) => (
                        <li
                            key={index}
                            className="hover:text-white transition-colors duration-200 ease-in-out"
                        >
                            {worker.name} ({worker.maximal_work_load}, {worker.port})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FractalInfo;
