import { Hono } from "@hono/hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono().basePath("/hmis").onError((error, c) => {
  return c.json({ code: 500, message: error.message });
});

const schema = z.object({
  dh: z.string().min(1, "DH is required"),
});

app.post("/work", zValidator("json", schema), async (c) => {
  const bodyJson = await c.req.json();
  const dh = bodyJson.dh;
  const date = new Date().toISOString();

  return c.json({
    DH: dh,
    ZH: "123456",
    ZZSJ: date,
    ZZDW: "111",
    SCZZ: date,
    SCDW: "333",
    MCZZ: "444",
    MCDW: "555",
    ZZC: true,
    YZC: false,
  });
});

Deno.serve({ port: 5003 }, app.fetch);
