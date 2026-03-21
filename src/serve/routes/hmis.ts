import { factory } from "../factory.ts";
import { getData } from "../handles/hmis/getData.ts";
import { upload } from "../handles/kh/upload.ts";

export const createHmisRouter = () => {
  const app = factory.createApp();

  app.get("/api/getData", ...getData);
  app.post("/api/saveData", ...upload);
  app.get("/TrainEquipOverhaul/api/hmiseqapi.do", ...getData);
  app.post("/TrainEquipOverhaul/api/hmiseqapi.do", ...upload);

  return app;
};
