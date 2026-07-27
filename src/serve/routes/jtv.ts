import { factory } from "#src/serve/factory.ts";
import { subMiddleware } from "#src/serve/middlewares/sub.ts";

export const jtvRouter = factory.createApp();
jtvRouter.get("/pmss/vjkxx.do", subMiddleware, (c) => {
  const method = c.req.query("method");
  const type = c.req.query("type");
  const param = c.req.query("param");

  console.log({ method, type, param });

  return c.json({
    code: "200",
    msg: "hello",
    data: [
      {
        CZZZDW: "048",
        CZZZRQ: "2009-10",
        MCZZDW: "131",
        MCZZRQ: "2018-07-09 00:00:00",
        SCZZDW: "131",
        SCZZRQ: "2018-07-09 00:00:00",

        DH: "91022070168",
        ZH: param,
        ZX: "RE2B",
        SRYY: "厂修",
        SRDW: "588",
      },
    ],
  });
});
jtvRouter.post("/pmss/example.do", subMiddleware, async (c) => {
  const body = await c.req.json();

  console.log(body);

  return c.json(true);
});
