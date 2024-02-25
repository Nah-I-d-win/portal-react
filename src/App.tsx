import { useEffect, useState } from "react";
import FractalRenderer from "./components/FractalRenderer";
import { FragmentRequest } from "./models/fragment_request";
import { RenderingData } from "./models/rendering_data";

interface PortalMessage {
    type: string;
    payload: RenderingData;
}

function App() {
    const [data, setData] = useState<RenderingData[]>([]);
    const [server, setServer] = useState({});

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8686/ws/");

        ws.onopen = () => {
            console.log("WebSocket connection established");
            const fragmentRequest = new FragmentRequest("portal", 100);
            ws.send(JSON.stringify(fragmentRequest));
        };

        ws.onmessage = (event: MessageEvent) => {
            console.log("Message from server received");
            const message: PortalMessage = JSON.parse(event.data);
            switch (message.type) {
                case "server_sync":
                    const server_data = JSON.parse(message.payload);
                    setServer(server_data);
                    break;
                case "rendering_data":
                    {
                        const newData: RenderingData = JSON.parse(message.payload);
                        setData((prevData) => [...prevData, newData]);
                    }
                    break;
                default:
                    console.warn("Unhandled unknown message type: ", message.type);
                    break;
            }
        };

        ws.onerror = (error: Event) => {
            console.error("WebSocket error: ", error);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        // Cleanup function
        return () => {
            ws.close();
        };
    }, []);

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <FractalRenderer data={data} server={server} width={800} height={800} />
        </div>
    );
}

export default App;
