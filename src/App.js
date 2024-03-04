import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import FractalRenderer from "./components/FractalRenderer";
import ConnectionStatus from "./components/ConnectionStatus";
import { useWebSocket } from "./app/hooks/useWebSocket";
import { useState } from "react";
import { PaletteHandler } from "./utils/colors";
function App() {
    const [wsUrl, setWsUrl] = useState("ws://localhost:8686/ws/");
    const { data, serverDto, isConnected, updateUrl } = useWebSocket(wsUrl);
    const [paletteHandler] = useState(new PaletteHandler());
    const updateWsUrl = (newUrl) => {
        setWsUrl(newUrl);
        updateUrl(newUrl);
    };
    return (_jsxs("div", { className: "w-screen h-screen flex justify-center items-center bg-gray-800", children: [_jsx(ConnectionStatus, { data: data, server: serverDto, paletteHandler: paletteHandler, isConnected: isConnected, onWsUrlChange: updateWsUrl }), _jsx(FractalRenderer, { data: data, server: serverDto, paletteHandler: paletteHandler, width: serverDto?.config.width ?? 800, height: serverDto?.config.height ?? 800 })] }));
}
export default App;
