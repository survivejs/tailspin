import {
  WebSocketServer,
} from "../lib/deno-websocket/mod.ts";
import type {
  WebSocket,
} from "../lib/deno-websocket/mod.ts";

const getWebsocketServer = () => {
  const wss = new WebSocketServer(8080);

  wss.on("connection", (ws: WebSocket) => {
    console.log("wss - Connected");

    ws.send("connected");

    // Catch possible messages here
    /*ws.on("message", (message: string) => {
      console.log(message);
      ws.send(message);
    });*/
  });

  return wss;
};

const websocketClient = `const socket = new WebSocket('ws://localhost:8080');
  
socket.addEventListener('message', (event) => {
  if (event.data === 'connected') {
    console.log('WebSocket - connected');
  }

  if (event.data === 'refresh') {
    location.reload();
  }
});`
  .split("\n")
  .join("");

export { getWebsocketServer, websocketClient };
