export function createWebSocket(url: string, cookie: string): WebSocket {
    const socket = new WebSocket(url, [], { headers: { cookie } });
    return socket;
}
