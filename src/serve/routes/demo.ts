import { factory } from "../factory.ts";
import { post } from "../handles/demo/post.ts";

export const createDemoApp = () => {
  const app = factory.createApp().basePath("/demo");

  app.post("/", ...post);

  return app;
};
