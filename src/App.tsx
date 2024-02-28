import FractalRenderer from "./components/FractalRenderer";
import ConnectionStatus from "./components/ConnectionStatus";
import { useWebSocket } from "./app/hooks/useWebSocket";
import { useState } from "react";

function App() {
    const [wsUrl, setWsUrl] = useState("ws://localhost:8686/ws/");
    const { data, serverDto, isConnected, updateUrl } = useWebSocket(wsUrl);

    const updateWsUrl = (newUrl: string) => {
        setWsUrl(newUrl);
        updateUrl(newUrl);
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-800">
            <ConnectionStatus
                data={data}
                server={serverDto}
                isConnected={isConnected}
                onWsUrlChange={updateWsUrl}
            />
            <FractalRenderer
                data={data}
                server={serverDto}
                width={serverDto?.config.width ?? 800}
                height={serverDto?.config.height ?? 800}
            />
        </div>
    );
}

export default App;
