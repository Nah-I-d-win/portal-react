import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import FractalInfo from "./FractalInfo";
import useFractalActions from "../app/hooks/useFractalActions";
import WebSocketUrlInput from "./WebSocketUrlInput";
import ActionButtons from "./ActionButtons";
const movementActions = [
    { label: "Move Up", actionType: "move", direction: "up" },
    { label: "Move Down", actionType: "move", direction: "down" },
    { label: "Move Left", actionType: "move", direction: "left" },
    { label: "Move Right", actionType: "move", direction: "right" },
];
const fractalCycleActions = [
    { label: "Previous Fractal", actionType: "cycle", direction: "previous" },
    { label: "Next Fractal", actionType: "cycle", direction: "next" },
];
const paletteCycleActions = [
    { label: "Previous Palette", actionType: "palette", direction: "previous" },
    { label: "Next Palette", actionType: "palette", direction: "next" },
];
const ConnectionStatus = ({ isConnected, server, data, onWsUrlChange, paletteHandler, }) => {
    const [tempWsUrl, setTempWsUrl] = useState("ws://localhost:8686/ws");
    const { loading, handleAction, sendFragmentRequest } = useFractalActions(paletteHandler);
    return (_jsxs("div", { className: "fixed top-20 right-4 px-6 py-3 space-y-3 rounded-lg text-sm font-medium bg-gray-900", children: [_jsx(WebSocketUrlInput, { tempWsUrl: tempWsUrl, setTempWsUrl: setTempWsUrl, applyWsUrl: () => onWsUrlChange(tempWsUrl) }), server && _jsx(FractalInfo, { server: server, data: data }), isConnected ? (_jsxs(_Fragment, { children: [_jsx(ActionButtons, { actions: movementActions, loading: loading, handleAction: handleAction }), _jsx(ActionButtons, { actions: fractalCycleActions, loading: loading, handleAction: handleAction }), _jsx(ActionButtons, { actions: paletteCycleActions, loading: loading, handleAction: handleAction }), _jsx("button", { onClick: sendFragmentRequest, className: "px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-md", children: "Issue Fragment Request" })] })) : (_jsxs("div", { children: [_jsx("p", { className: "text-red-500", children: "Disconnected from server" }), _jsx("button", { onClick: () => onWsUrlChange(tempWsUrl), className: "px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-md", children: "Reconnect" })] }))] }));
};
export default ConnectionStatus;
