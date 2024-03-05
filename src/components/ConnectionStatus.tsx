import React, { useState } from "react";
import FractalInfo from "./FractalInfo";
import { ServerDto } from "../models/server";
import { RenderingData } from "../models/rendering_data";
import { PaletteHandler } from "../utils/colors";
import useFractalActions from "../app/hooks/useFractalActions";
import WebSocketUrlInput from "./WebSocketUrlInput";
import ActionButtons, { ActionButton } from "./ActionButtons";

interface ConnectionStatusProps {
    isConnected: boolean;
    server?: ServerDto | null;
    data?: RenderingData[];
    paletteHandler: PaletteHandler;
    onWsUrlChange: (newUrl: string) => void;
}

const movementActions: ActionButton[] = [
    { label: "Move Up", actionType: "move", direction: "up" },
    { label: "Move Down", actionType: "move", direction: "down" },
    { label: "Move Left", actionType: "move", direction: "left" },
    { label: "Move Right", actionType: "move", direction: "right" },
];

const fractalCycleActions: ActionButton[] = [
    { label: "Previous Fractal", actionType: "cycle", direction: "previous" },
    { label: "Next Fractal", actionType: "cycle", direction: "next" },
];

const paletteCycleActions: ActionButton[] = [
    { label: "Previous Palette", actionType: "palette", direction: "previous" },
    { label: "Next Palette", actionType: "palette", direction: "next" },
];

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
    isConnected,
    server,
    data,
    onWsUrlChange,
    paletteHandler,
}) => {
    const [tempWsUrl, setTempWsUrl] = useState("ws://localhost:8686/ws");

    const { loading, handleAction, sendFragmentRequest } =
        useFractalActions(paletteHandler);

    return (
        <div className="fixed top-20 right-4 px-6 py-3 space-y-3 rounded-lg text-sm font-medium bg-gray-900 z-20">
            <WebSocketUrlInput
                tempWsUrl={tempWsUrl}
                setTempWsUrl={setTempWsUrl}
                applyWsUrl={() => onWsUrlChange(tempWsUrl)}
            />
            {server && <FractalInfo server={server} data={data} />}
            {isConnected ? (
                <>
                    <ActionButtons
                        actions={movementActions}
                        loading={loading}
                        handleAction={handleAction}
                    />
                    <ActionButtons
                        actions={fractalCycleActions}
                        loading={loading}
                        handleAction={handleAction}
                    />
                    <ActionButtons
                        actions={paletteCycleActions}
                        loading={loading}
                        handleAction={handleAction}
                    />
                    <button
                        onClick={sendFragmentRequest}
                        className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-md"
                    >
                        Issue Fragment Request
                    </button>
                </>
            ) : (
                <div>
                    <p className="text-red-500">Disconnected from server</p>
                    <button
                        onClick={() => onWsUrlChange(tempWsUrl)}
                        className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-md"
                    >
                        Reconnect
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConnectionStatus;
