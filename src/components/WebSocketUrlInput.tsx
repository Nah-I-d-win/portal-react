import React from "react";

interface Props {
    tempWsUrl: string;
    setTempWsUrl: React.Dispatch<React.SetStateAction<string>>;
    applyWsUrl: () => void;
}

const WebSocketUrlInput: React.FC<Props> = ({
    tempWsUrl,
    setTempWsUrl,
    applyWsUrl,
}) => (
    <div className="my-4">
        <input
            type="text"
            placeholder="Enter WebSocket URL"
            value={tempWsUrl}
            onChange={(e) => setTempWsUrl(e.target.value)}
            className="text-white"
        />
        <button onClick={applyWsUrl} className="ml-2">
            Apply URL
        </button>
    </div>
);

export default WebSocketUrlInput;
