import React, { useState } from "react";
import axiosInstance from "../app/axios";
import { RenderingData } from "../models/rendering_data";
import { ServerDto } from "../models/server";
import FractalInfo from "./FractalInfo";

interface ConnectionStatusProps {
    isConnected: boolean;
    server?: ServerDto | null;
    data?: RenderingData[];
    onWsUrlChange: (newUrl: string) => void;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
    isConnected,
    server,
    data,
    onWsUrlChange,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [tempWsUrl, setTempWsUrl] = useState("http://localhost:8686/ws");

    const handleWsUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempWsUrl(e.target.value);
    };

    const applyWsUrl = () => {
        onWsUrlChange(tempWsUrl);
    };

    const movementDirections = [
        { label: "Move Up", direction: "up" },
        { label: "Move Down", direction: "down" },
        { label: "Move Left", direction: "left" },
        { label: "Move Right", direction: "right" },
    ];

    const fractalCycles = [
        { label: "Previous Fractal", direction: "previous" },
        { label: "Next Fractal", direction: "next" },
    ];

    const handleAction = async (type: "move" | "cycle", direction: string) => {
        setLoading(true);
        const endpoint =
            type === "move" ? "/api/fractal/move" : "/api/fractal/cycle";
        try {
            await axiosInstance.post(endpoint, { direction });
        } catch (error) {
            console.error(
                `Error ${type === "move" ? "moving" : "cycling"} fractal:`,
                error,
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed top-20 right-4 px-6 py-3 space-y-3 rounded-lg text-sm font-medium bg-gray-900">
            <div className="flex items-center justify-between text-gray-400">
                <span>Status:</span>
                <span
                    className={`font-semibold ${isConnected ? "text-green-400" : "text-red-400"}`}
                >
                    {isConnected ? "Connected" : "Disconnected"}
                </span>
            </div>
            <div className="my-4">
                <input
                    type="text"
                    placeholder="Enter WebSocket URL"
                    defaultValue={tempWsUrl}
                    value={tempWsUrl}
                    onChange={handleWsUrlChange}
                    className="text-white"
                />
                <button onClick={applyWsUrl} className="ml-2">
                    Apply URL
                </button>
            </div>
            {server && (
                <>
                    <FractalInfo server={server} data={data} />
                    <ActionButtons
                        actions={fractalCycles}
                        loading={loading}
                        onAction={handleAction}
                        type="cycle"
                    />
                    <ActionButtons
                        actions={movementDirections}
                        loading={loading}
                        onAction={handleAction}
                        type="move"
                    />
                </>
            )}
        </div>
    );
};

const ActionButtons = ({
    actions,
    loading,
    onAction,
    type,
}: {
    actions: { label: string; direction: string }[];
    loading: boolean;
    onAction: (type: "move" | "cycle", direction: string) => void;
    type: "move" | "cycle";
}) => (
    <div className="flex gap-2">
        {actions.map((action) => (
            <button
                key={action.label}
                onClick={() => onAction(type, action.direction)}
                disabled={loading}
                className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-md"
            >
                {action.label}
            </button>
        ))}
    </div>
);

export default ConnectionStatus;
