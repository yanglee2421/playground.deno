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

interface Item {
  //单号
  DH: string;
  //轴号
  ZH: string;
  //轴型
  ZX: string;
  //收入单位
  SRDW: string;
  //收入原因
  SRYY: string;
  //车轴制造单位
  CZZZDW: string;
  //车轴制造日期
  CZZZRQ: string;
  //首次组装单位
  SCZZDW: string;
  //首次组装日期
  SCZZRQ: string;
  //末次组装单位
  MCZZDW: string;
  //末次组装日期
  MCZZRQ: string;
  //左轴
  ZZC: boolean;
  //右轴承
  YZC: boolean;
}

mock.post("/work", zValidator("json", schema), (c) => {
  const bodyJson = c.req.valid("json");
  const { dh, zh } = bodyJson;

  const date = dayjs().format("YYYY-MM-DD");

  const items: Item[] = [];

  if (dh) {
    items.push({
      DH: dh,
      ZH: "38254",
      ZX: "RD2",
      SRDW: "003",
      SRYY: "",
      CZZZDW: "005",
      CZZZRQ: date,
      SCZZDW: "009",
      SCZZRQ: date,
      MCZZDW: "007",
      MCZZRQ: date,
      ZZC: false,
      YZC: false,
    });

    return c.json(items);
  }

  if (zh) {
    items.push(
      {
        DH: "DH001",
        ZH: zh,
        ZX: "RD2",
        SRDW: "003",
        SRYY: "",
        CZZZDW: "005",
        CZZZRQ: date,
        SCZZDW: "009",
        SCZZRQ: date,
        MCZZDW: "007",
        MCZZRQ: date,
        ZZC: false,
        YZC: false,
      },
      {
        DH: "DH002",
        ZH: zh,
        ZX: "RE2B",
        SRDW: "001",
        SRYY: "",
        CZZZDW: "002",
        CZZZRQ: date,
        SCZZDW: "003",
        SCZZRQ: date,
        MCZZDW: "004",
        MCZZRQ: date,
        ZZC: true,
        YZC: true,
      },
    );

    return c.json(items);
  }

  throw new Error("dh或zh必须提供其中至少一个");
});
