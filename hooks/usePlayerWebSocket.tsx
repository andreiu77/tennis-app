import { useEffect } from "react";

export default function usePlayerWebSocket(onNewPlayer: (player: any) => void) {
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3001");

        socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "new-player") {
            onNewPlayer(data.payload);
        }
        };

        return () => {
        socket.close();
        };
    }, [onNewPlayer]);
}