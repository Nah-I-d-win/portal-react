interface ConnectionStatusProps {
    isConnected: boolean;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected }) => {
    return (
        <div
            className={`fixed top-4 left-4 px-4 py-2 rounded-md text-sm font-medium ${isConnected ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
            {isConnected ? "Connected" : "Disconnected"}
        </div>
    );
};

export default ConnectionStatus;
