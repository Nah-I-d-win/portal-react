import FractalRenderer from "./components/FractalRenderer";
import ConnectionStatus from "./components/ConnectionStatus";
import { useWebSocket } from "./app/hooks/useWebSocket";
import { useState } from "react";
import { PaletteHandler } from "./utils/colors";
import FractalGallery from "./components/FractalGallery";

function App() {
    const [wsUrl, setWsUrl] = useState("ws://localhost:8686/ws/");
    const { data, serverDto, isConnected, updateUrl } = useWebSocket(wsUrl);
    const [paletteHandler] = useState<PaletteHandler>(new PaletteHandler());
    const [showLibrary, setShowLibrary] = useState(false);

    const updateWsUrl = (newUrl: string) => {
        setWsUrl(newUrl);
        updateUrl(newUrl);
    };

    const toggleLibrary = () => {
        setShowLibrary((prevShowLibrary) => !prevShowLibrary);
    };

    return (
        <div className="relative w-screen h-screen bg-gray-800">
            <ConnectionStatus
                data={data}
                server={serverDto}
                paletteHandler={paletteHandler}
                isConnected={isConnected}
                onWsUrlChange={updateWsUrl}
            />
            <div className="absolute w-screen h-screen flex items-center justify-center">
                <FractalRenderer
                    data={data}
                    server={serverDto}
                    paletteHandler={paletteHandler}
                    width={serverDto?.config.width ?? 800}
                    height={serverDto?.config.height ?? 800}
                />
            </div>
            {showLibrary && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
                    <FractalGallery />
                </div>
            )}
            <button
                className="absolute top-4 right-4 px-4 py-2 bg-gray-600 text-white rounded-md"
                onClick={toggleLibrary}
            >
                {showLibrary ? "Hide Library" : "Show Library"}
            </button>
        </div>
    );
}

export default App;
