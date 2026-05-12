import { mock } from "#src/serve/routes/mock.ts";
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
    .route("/api", demoRouter)
    .route("/hmis", mock);

  return Deno.serve(
    {
      port: 5003,
    },
    app.fetch,
  );
};

main();
