import { useEffect, useState, useCallback, useRef } from "react";
export function useWebSocket(initialUrl) {
    const [data, setData] = useState([]);
    const [serverDto, setServerDto] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [url, setUrl] = useState(initialUrl);
    const [retryCount, setRetryCount] = useState(0);
    const ws = useRef(null);
    const closeConnection = useCallback(() => {
        if (ws.current) {
            ws.current.close();
        }
    }, []);
    const connect = useCallback(() => {
        closeConnection();
        ws.current = new WebSocket(url);
        ws.current.onopen = () => {
            console.log("WebSocket connection established with", url);
            setIsConnected(true);
            setRetryCount(0);
        };
        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
                case "server_sync":
                    setServerDto(JSON.parse(message.payload));
                    break;
                case "rendering_data":
                    setData((prevData) => [...prevData, JSON.parse(message.payload)]);
                    break;
                default:
                    console.warn("Unhandled message type:", message.type);
                    break;
            }
        };
        ws.current.onerror = (error) => {
            console.error("WebSocket error with", url, ":", error);
        };
        ws.current.onclose = () => {
            console.log("WebSocket connection closed with", url);
            setIsConnected(false);
            setTimeout(() => {
                console.log("Retrying connection...");
                connect();
                setRetryCount((prevRetryCount) => prevRetryCount + 1);
            }, 5000);
        };
    }, [url, closeConnection]);
    const updateUrl = useCallback((newUrl) => {
        setUrl(newUrl);
    }, []);
    useEffect(() => {
        connect();
        return () => {
            closeConnection();
        };
    }, [connect, closeConnection]);
    return { data, serverDto, isConnected, updateUrl, retryCount };
}
