import { zValidator } from "@hono/zod-validator";
import dayjs from "dayjs";
import { z } from "zod";
import { factory } from "../factory.ts";

export const mock = factory.createApp().onError((error, c) => {
  return c.json({ code: 500, message: error.message });
});

const schema = z.object({
  dh: z.string(),
  zh: z.string(),
});

mock.post("/work", zValidator("json", schema), (c) => {
  const bodyJson = c.req.valid("json");
  const { dh, zh } = bodyJson;

  const date = dayjs().format("YYYY-MM-DD");

  if (dh) {
    return c.json([
      {
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
      },
    ]);
  }

  if (zh) {
    return c.json([
      {
        DH: "96164616156",
        ZH: zh,
        ZZSJ: date,
        ZZDW: "111",
        SCZZ: date,
        SCDW: "333",
        MCZZ: "444",
        MCDW: "555",
        ZZC: true,
        YZC: false,
      },
      {
        DH: "132165464",
        ZH: zh,
        ZZSJ: date,
        ZZDW: "111",
        SCZZ: date,
        SCDW: "333",
        MCZZ: "444",
        MCDW: "555",
        ZZC: true,
        YZC: false,
      },
    ]);
  }

  throw new Error("dh或zh必须提供其中至少一个");
});
