import { useEffect, useState, useCallback } from "react";
import { FragmentRequest } from "../../models/fragment_request";
import { RenderingData } from "../../models/rendering_data";
import { ServerDto } from "../../models/server";

interface PortalMessage {
    type: string;
    // NOTE: eww, make it cleaner
    payload: any;
}

export function useWebSocket(url: string) {
    const [data, setData] = useState<RenderingData[]>([]);
    const [serverDto, setServerDto] = useState<ServerDto | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const [shouldReconnect, setShouldReconnect] = useState<boolean>(true);
    const [reconnectAttempts, setReconnectAttempts] = useState<number>(0);

    const connect = useCallback(() => {
        if (!shouldReconnect) return; // Prevent connection if shouldReconnect is false

        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log("WebSocket connection established");
            setIsConnected(true);
            setReconnectAttempts(0);
            ws.send(JSON.stringify(new FragmentRequest("portal", 100)));
        };

        ws.onmessage = (event: MessageEvent) => {
            console.log("Message from server received");
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

        ws.onerror = (error: Event) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
            setIsConnected(false);
            if (shouldReconnect) {
                setTimeout(
                    () => {
                        setReconnectAttempts((prevAttempts) => prevAttempts + 1);
                        connect();
                    },
                    // Exponential reconnection attempts
                    Math.min(10000, 1000 * reconnectAttempts),
                );
            }
        };

        return () => {
            setShouldReconnect(false);
            ws.close();
        };
    }, [url, shouldReconnect, reconnectAttempts]);

    useEffect(() => {
        connect();
        return () => setShouldReconnect(false);
    }, [connect]);

    return { data, serverDto, isConnected };
}
