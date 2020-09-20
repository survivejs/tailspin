import { EventEmitter } from "./../deps.ts";
import { Server, serve } from "./../deps.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  isWebSocketPingEvent,
  isWebSocketPongEvent,
  connectWebSocket,
  WebSocket as STDWebSocket,
} from "./../deps.ts";

import { WebSocketError } from "./errors.ts";

export enum WebSocketState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

export class WebSocketServer extends EventEmitter {
  clients: Set<WebSocket> = new Set<WebSocket>();
  server?: Server = undefined;
  constructor(private port: Number = 8080) {
    super();
    this.connect();
  }
  async connect() {
    this.server = serve(`:${this.port}`);
    for await (const req of this.server) {
      const { conn, r: bufReader, w: bufWriter, headers } = req;
      try {
        const sock = await acceptWebSocket({
          conn,
          bufReader,
          bufWriter,
          headers,
        });
        const ws: WebSocket = new WebSocket();
        ws.open(sock);
        this.clients.add(ws);
        this.emit("connection", ws);
      } catch (err) {
        this.emit("error", err);
        await req.respond({ status: 400 });
      }
    }
  }
  async close() {
    this.server?.close();
    this.clients.clear();
  }
}

export class WebSocket extends EventEmitter {
  webSocket?: STDWebSocket;
  state: WebSocketState = WebSocketState.CONNECTING;
  constructor(private endpoint?: string) {
    super();
    if (this.endpoint !== undefined) {
      this.createSocket(endpoint);
    }
  }
  async createSocket(endpoint?: string) {
    const webSocket = await connectWebSocket(this.endpoint!);
    this.open(webSocket);
  }
  async open(sock: STDWebSocket) {
    this.webSocket = sock;
    this.state = WebSocketState.OPEN;
    this.emit("open");
    try {
      for await (const ev of sock) {
        if (typeof ev === "string") {
          // text message
          this.emit("message", ev);
        } else if (ev instanceof Uint8Array) {
          // binary message
          this.emit("message", ev);
        } else if (isWebSocketPingEvent(ev)) {
          const [, body] = ev;
          // ping
          this.emit("ping", body);
        } else if (isWebSocketPongEvent(ev)) {
          const [, body] = ev;
          // pong
          this.emit("pong", body);
        } else if (isWebSocketCloseEvent(ev)) {
          // close
          const { code, reason } = ev;
          this.state = WebSocketState.CLOSED;
          this.emit("close", code);
        }
      }
    } catch (err) {
      this.emit("close", err);
      if (!sock.isClosed) {
        await sock.close(1000).catch((e) => {
          throw new WebSocketError(e);
        });
      }
    }
  }
  async ping(message?: string | Uint8Array) {
    if (this.state === WebSocketState.CONNECTING) {
      throw new WebSocketError(
        "WebSocket is not open: state 0 (CONNECTING)",
      );
    }
    return this.webSocket!.ping(message);
  }
  async send(message: string | Uint8Array) {
    if (this.state === WebSocketState.CONNECTING) {
      throw new WebSocketError(
        "WebSocket is not open: state 0 (CONNECTING)",
      );
    }
    return this.webSocket!.send(message);
  }
  async close(code = 1000, reason?: string): Promise<void> {
    if (
      this.state === WebSocketState.CLOSING ||
      this.state === WebSocketState.CLOSED
    ) {
      return;
    }
    this.state = WebSocketState.CLOSING;
    return this.webSocket!.close(code, reason!);
  }
  async closeForce() {
    if (
      this.state === WebSocketState.CLOSING ||
      this.state === WebSocketState.CLOSED
    ) {
      return;
    }
    this.state = WebSocketState.CLOSING;
    return this.webSocket!.closeForce();
  }
  get isClosed(): boolean | undefined {
    return this.webSocket!.isClosed;
  }
}
