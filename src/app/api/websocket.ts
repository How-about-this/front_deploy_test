let ws: WebSocket;

export const connectWebSocket = (url: string, onMessage: (message: any) => void) => {
    ws = new WebSocket(url);

    ws.onopen = () => {
        console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
};

export const sendMessageWebSocket = (message: any) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
    }
};

export const disconnectWebSocket = () => {
    if (ws) {
        ws.close();
    }
};
