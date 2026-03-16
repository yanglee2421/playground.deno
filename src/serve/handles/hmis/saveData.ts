import { factory } from "../../factory.ts";
import { subMiddleware } from "../../middlewares/sub.ts";

export const saveData = factory.createHandlers(
  subMiddleware,
  (ctx) => {
    return ctx.json({ code: "200", msg: "数据上传成功" });
  },
);
