import * as timers from "node:timers";
import { errorMessage } from "#dist/index.ts";

const websocketHandler = (request: Request) => {
  const { socket, response } = Deno.upgradeWebSocket(request);

  socket.addEventListener("open", () => {
    socket.send("opened");
  });
  socket.addEventListener("close", () => {
    socket.send("close");
  });
  socket.addEventListener("message", (event) => {
    console.log(event.data);

    socket.send("message");
  });
  socket.addEventListener("error", () => {
    socket.send("error");
  });

  return response;
};

class Resource {
  list: number[];
  index: number;
  constructor() {
    this.list = [];
    this.index = 0;
  }
  load() {
    this.list = Array.from({ length: 100 }, (...args) => args[1] + 1);
    this.index = 0;
  }
  clear() {
    this.list = [];
    this.index = 0;
  }
  read() {
    const value = this.list[this.index];
    this.index++;

    const done = this.index > this.list.length;
    return [done, value] as const;
  }
}

const abortController = new AbortController();

Deno.serve(
  {
    signal: abortController.signal,
    hostname: "127.0.0.1",
    port: 8080,

    onListen(netAddr) {
      console.log(netAddr.hostname, netAddr.port, netAddr.transport);
    },
    onError(error) {
      const message = errorMessage(error);
      const headers = new Headers();

      headers.set("Content-Type", "application/json;charset=utf-8");

      return new Response(JSON.stringify({ message }), { headers });
    },
  },
  async (request) => {
    if (request.headers.get("upgrade") === "websocket") {
      return websocketHandler(request);
    }

    const jwt = request.headers.get("Authorization");
    const body = await request.json();
    const headers = new Headers();
    const textEncoder = new TextEncoder();
    const resource = new Resource();

    const readableStream = new ReadableStream<Uint8Array>({
      start() {
        resource.load();
      },
      async pull(controller) {
        await timers.promises.setTimeout(100);

        const [done, value] = resource.read();

        if (done) {
          controller.close();
          resource.clear();
          return;
        }

        controller.enqueue(textEncoder.encode(String(value)));
      },
      cancel() {
        resource.clear();
      },
    });

    headers.set("Content-Type", "application/json;charset=utf-8");
    console.log(jwt, body);

    return new Response(readableStream, { headers });
  },
);
