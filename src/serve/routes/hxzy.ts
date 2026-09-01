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

hxzyRouter.post(
  "/lzjx/dx/csbts/device_api/csbts/api/saveData",
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

hxzyRouter.get("/lzjx/dx/csbts/device_api/csbts/api/getDate", (c) => {
  return c.json({
    code: "200",
    msg: "数据读取成功",
    data: [
      {
        CZZZDW: "048",
        CZZZRQ: "2009-10",
        MCZZDW: "131",
        MCZZRQ: "2018-07-09 00:00:00",
        SCZZDW: "131",
        SCZZRQ: "2018-07-09 00:00:00",
        DH: "91022070168",
        ZH: "67444",
        ZX: "RE2B",
        SRYY: "厂修",
        SRDW: "588",
      },
    ],
  });
});
