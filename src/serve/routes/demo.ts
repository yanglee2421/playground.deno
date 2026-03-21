import { factory } from "../factory.ts";
import { upload } from "../handles/kh/upload.ts";

export const createDemoApp = () => {
  const app = factory.createApp();

  app.post("/csbts_501/save", ...upload);
  app.post("/csbts_502/save", ...upload);
  app.post("/csbts_503/save", ...upload);

  return app;
};
