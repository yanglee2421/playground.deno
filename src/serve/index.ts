import { createRootApp } from "./app.ts";
import { createDemoApp } from "./routes/demo.ts";
import { createHmisRouter } from "./routes/hmis.ts";

const main = () => {
  const app = createRootApp();
  const hmisRouter = createHmisRouter();
  const demoRouter = createDemoApp();

  app.route("/", hmisRouter);
  app.route("/api", demoRouter);

  Deno.serve(
    {
      hostname: "127.0.0.1",
      port: 8080,
    },
    app.fetch,
  );
};

void main();
