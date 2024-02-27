import FractalRenderer from "./components/FractalRenderer";
import { useWebSocket } from "./app/hooks/useWebSocket";
import ConnectionStatus from "./components/ConnectionStatus";
import DataStatus from "./components/DataStatus";

function App() {
    const { data, serverDto, isConnected } = useWebSocket(
        "ws://localhost:8686/ws/",
    );

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
            <ConnectionStatus isConnected={isConnected} />
            <DataStatus data={data} />
            <FractalRenderer
                data={data}
                server={serverDto}
                width={800}
                height={800}
            />
        </div>
    );
}

export default App;
