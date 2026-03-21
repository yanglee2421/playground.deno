import { factory } from "../factory.ts";
import { post } from "../handles/demo/post.ts";

export const createDemoApp = () => {
  const app = factory.createApp();

  app.post("/csbts_501/save", ...post);
  app.post("/csbts_502/save", ...post);
  app.post("/csbts_503/save", ...post);

  return app;
};
