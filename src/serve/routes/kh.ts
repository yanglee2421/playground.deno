import { jiangan } from "#src/serve/handles/kh/jiangan.ts";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { factory } from "../factory.ts";
import { upload } from "../handles/kh/upload.ts";

const schema = z.object({
  mesureId: z.string(),
});

export const createKHApp = () => {
  return factory
    .createApp()
    .post("/api/lzdx_csbtsj_get/get", zValidator("json", schema), (c) => {
      const data = c.req.valid("json");

      let zx = "RE2B";

      if (data.mesureId.endsWith("1")) {
        zx = "RD2";
      }

      return c.json({
        data: {
          mesureId: "dh" + data.mesureId,
          zh: data.mesureId,
          zx: zx,
          clbjLeft: "HEZD Ⅱ 18264",
          clbjRight: "HEZD Ⅱ 32744",
          czzzrq: "2003-01-16",
          czzzdw: "673",
          ldszrq: "2014-06-22",
          ldszdw: "673",
          ldmzrq: "2018-04-13",
          ldmzdw: "623",
        },
        code: 200,
        msg: "success",
      });
    })
    .post("/api/lzdx_csbtsj_tsjg/save", ...upload)
    .post("/api/lzdx_csbtsj_whzy_tsjgqx/save", ...upload)
    .post("/lzdxgwj/controller/api/ldcljjk/getData", ...jiangan);
};
