import { createRootApp } from "./app.ts";
import { createDemoApp } from "./routes/demo.ts";
import { createHmisRouter } from "./routes/hmis.ts";
import { createKHApp } from "./routes/kh.ts";

const main = () => {
  const hmisRouter = createHmisRouter();
  const demoRouter = createDemoApp();
  const khApp = createKHApp();
  const app = createRootApp()
    .route("/", khApp)
    .route("/", hmisRouter)
    .route("/api", demoRouter);

  Deno.serve(
    {
      hostname: "127.0.0.1",
      port: 8080,
    },
    app.fetch,
  );
};

void main();
