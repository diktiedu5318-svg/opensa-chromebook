
export type TransportState =
  | "disconnected"
  | "connecting"
  | "connected"
  | "error";

export class BrowserTransport {
  private socket: WebSocket | null = null;

  onState?: (state: TransportState) => void;
  onPacket?: (packet: Uint8Array) => void;

  connect(url: string): void {
    this.disconnect();
    this.onState?.("connecting");

    try {
      const socket = new WebSocket(url);
      socket.binaryType = "arraybuffer";
      this.socket = socket;

      socket.onopen = () => {
        this.onState?.("connected");
      };

      socket.onmessage = (event: MessageEvent) => {
        if (event.data instanceof ArrayBuffer) {
          this.onPacket?.(new Uint8Array(event.data));
        }
      };

      socket.onerror = () => {
        this.onState?.("error");
      };

      socket.onclose = () => {
        if (this.socket === socket) {
          this.socket = null;
          this.onState?.("disconnected");
        }
      };
    } catch {
      this.onState?.("error");
    }
  }

  send(packet: Uint8Array): boolean {
    if (
      !this.socket ||
      this.socket.readyState !== WebSocket.OPEN
    ) {
      return false;
    }

    this.socket.send(
      packet.buffer.slice(
        packet.byteOffset,
        packet.byteOffset + packet.byteLength
      )
    );

    return true;
  }

  disconnect(): void {
    const socket = this.socket;
    this.socket = null;

    if (socket) {
      socket.close();
    }
  }
}
