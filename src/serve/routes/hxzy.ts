import { subMiddleware } from "#src/serve/middlewares/sub.ts";
import { factory } from "../factory.ts";

export const hxzyRouter = factory.createApp();

hxzyRouter.post(
  "/lzjx/dx/csbts/device_api/csbts/api/saveRcxnjy.json",
  subMiddleware,
  async (c) => {
    const body = await c.req.json();

    console.log(body);

    return c.json({
      code: "200",
      msg: "数据上传成功",
    });
  },
);
