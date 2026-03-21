import { factory } from "../factory.ts";
import { getData } from "../handles/hmis/getData.ts";
import { saveData } from "../handles/hmis/saveData.ts";

export const createHmisRouter = () => {
  const app = factory.createApp();

  app.get("/api/getData", ...getData);
  app.post("/api/saveData", ...saveData);
  app.get("/TrainEquipOverhaul/api/hmiseqapi.do", ...getData);
  app.post("/TrainEquipOverhaul/api/hmiseqapi.do", ...saveData);

  return app;
};
