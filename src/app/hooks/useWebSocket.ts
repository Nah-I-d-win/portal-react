import { useEffect, useState, useCallback, useRef } from "react";
import { FragmentRequest } from "../../models/fragment_request";
import { RenderingData } from "../../models/rendering_data";
import { ServerDto } from "../../models/server";

interface PortalMessage {
    type: string;
    payload: any; // Consider using a more specific type or union of types if possible
}

export function useWebSocket(initialUrl: string) {
    const [data, setData] = useState<RenderingData[]>([]);
    const [serverDto, setServerDto] = useState<ServerDto | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [url, setUrl] = useState<string>(initialUrl); // Track the URL as state

    const ws = useRef<WebSocket | null>(null);

    const closeConnection = useCallback(() => {
        if (ws.current) {
            ws.current.close(); // Close the existing connection if open
        }
    }, []);

    const connect = useCallback(() => {
        closeConnection(); // Ensure any existing connection is closed

        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            console.log("WebSocket connection established with", url);
            setIsConnected(true);
            ws.current?.send(JSON.stringify(new FragmentRequest("portal", 100)));
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
        };
    }, [url, closeConnection]);

    // Provide a method to update the URL, which triggers reconnection
    const updateUrl = useCallback((newUrl: string) => {
        setUrl(newUrl);
    }, []);

    useEffect(() => {
        connect();
        return () => {
            closeConnection(); // Clean up connection when component unmounts or URL changes
        };
    }, [connect, closeConnection]);

    return { data, serverDto, isConnected, updateUrl };
}
