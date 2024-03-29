import { useEffect, useState, useCallback, useRef } from "react";
import { RenderingData } from "../../models/rendering_data";
import { ServerDto } from "../../models/server";

interface PortalMessage {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
}

export function useWebSocket(initialUrl: string) {
    const [data, setData] = useState<RenderingData[]>([]);
    const [serverDto, setServerDto] = useState<ServerDto | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [url, setUrl] = useState<string>(initialUrl);
    const [retryCount, setRetryCount] = useState<number>(0);

    const ws = useRef<WebSocket | null>(null);

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

        ws.current.onmessage = (event: MessageEvent) => {
            const message: PortalMessage = JSON.parse(event.data);
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

        ws.current.onerror = (error: Event) => {
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

    const updateUrl = useCallback((newUrl: string) => {
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
