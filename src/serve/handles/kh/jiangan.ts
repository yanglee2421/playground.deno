import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { factory } from "../../factory.ts";
import { subMiddleware } from "../../middlewares/sub.ts";

const schema = z.object({
  mesureId: z.string().min(1, "mesureId is required"),
});

export const jiangan = factory.createHandlers(
  subMiddleware,
  zValidator("json", schema),
  (c) => {
    const { mesureId } = c.req.valid("json");

    console.log("mesureId", mesureId);

    return c.json({
      data: {
        rlx: "HESA",
        ldmczzrq: "2014-10-27",
        yzcybjdw: "115",
        zzcybjbj: "0",
        lldsxh: "084",
        llx: "HESA",
        ybzhbbrq: "2014-10-27",
        rldyln: "2014-01-01",
        ldsczzdw: "",
        yzcxzdxcdh: "1厂",
        yzcxc: "Y",
        zbzhbbrq: "2014-10-27",
        rlddj: "",
        lldgzph: "II",
        ljphbj: "",
        yzcdj: "",
        zhouwei: 3,
        lfbk: "否",
        rjphbj: "",
        yzcdx: "",
        rldzzny: "2014-01-01",
        czcz: "LZ50",
        lldyln: "2014-01-01",
        rldrlllh: " 14-0-00258",
        yzhchxh: "353130B",
        zzcbczydw: "115",
        lldcdh: "MG",
        zzhchxh: "353130B",
        czzzrq: "2014-09-01",
        zh: "20803",
        rldcdh: "MG",
        ybzbbdw: "183",
        czxh: "RE2B",
        lldrlllh: " 14-0-00258",
        ldmczzdw: "183",
        llddj: "",
        llrrllgh: "",
        czzzdw: "183",
        rlrrllgh: "",
        lldzzny: "2014-01-01",
        zzcybjdw: "",
        yzcybjbj: "0",
        zbzhbbzhh: "20803",
        rldsxh: "038",
        yzcbczydw: "572",
        srczcx: "C70E",
        yzcszny: "2025-09-01",
        srch: "1769947",
        rldgzph: "II",
        zzcxzdxcdh: "1厂",
        zzcxc: "Y",
        zzcdx: "",
        ldsczzrq: "2014-10-27",
        yzcbczyny: "2025-09-22",
        zzcbczyny: "2023-08-03",
        zzcdj: "",
        zzcszny: "2018-08-01",
        rfbk: "否",
      },
      msg: "success",
      code: "200",
    });
  },
);
