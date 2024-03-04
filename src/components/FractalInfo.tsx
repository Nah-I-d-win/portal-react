import React from "react";
import { RenderingData } from "../models/rendering_data";
import { ServerDto } from "../models/server";

interface Props {
    server: ServerDto;
    data?: RenderingData[];
}

const FractalInfo: React.FC<Props> = ({ server, data = [] }) => (
    <div className="space-y-2 text-gray-300">
        <h2 className="text-gray-400">Fractal Info:</h2>
        <p>Type: {server.currentFractal}</p>
        <p>Color Scheme: inferno</p>
        <p>
            View Range: [
            <span className="text-indigo-400">
                {server.range.min.x.toFixed(2)}, {server.range.min.y.toFixed(2)}
            </span>
            ] to [
            <span className="text-indigo-400">
                {server.range.max.x.toFixed(2)}, {server.range.max.y.toFixed(2)}
            </span>
            ]
        </p>
        <p>Tiles Received: {data.length}</p>
        <p>Workers:</p>
        <ul className="mt-1">
            {Object.values(server.workers)
                .slice(0, 5)
                .map((worker, index) => (
                    <li
                        key={index}
                        className="hover:text-white transition-colors duration-200 ease-in-out"
                    >
                        {worker.name} ({worker.maximal_work_load}, {worker.port})
                    </li>
                ))}
        </ul>
    </div>
);

export default FractalInfo;
