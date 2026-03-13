import { Hono } from "@hono/hono";

const main = () => {
  const app = new Hono();

  app.get("/api/getData", (ctx) => {
    const url = new URL(ctx.req.url);
    const barCode = url.searchParams.get("param") || "";
    const type = url.searchParams.get("type") || "";

    if (type === "csbtszh") {
      return ctx.json({
        code: "200",
        msg: "读取成功，返回数据条数：2",
        data: [
          {
            LBZGZPH: null,
            CLLWKSRZ: 139.3,
            DH: "6622508145029",
            CZZZRQ: "2018-10-01 00:00:00",
            CLLWKSRY: 139.3,
            PJ_ID: "DX0066220250801632",
            LBYGZPH: null,
            LBYLH: "06659",
            MCZZDW: "183",
            SCZZDW: "183",
            LBZCDH: "MG",
            LBYLX: "9H",
            CLLWHSRY: 44,
            CLLWHSRZ: 44.8,
            LBZSXH: "019",
            CLZJSRY: 826.4,
            MCZZRQ: "2019-01-07 00:00:00",
            CLZJSRZ: 827.1,
            LBYZZRQ: "2018-11-01 00:00:00",
            ZH: "79199",
            LBZLH: "06659",
            SCZZRQ: "2019-01-07 00:00:00",
            LBZZZRQ: "2018-11-01 00:00:00",
            CZZZDW: "105",
            LBYSXH: "107",
            ZX: "RE2B",
            LBZLX: "9H",
            LBYCDH: "MG",
          },
          {
            LBZGZPH: "Z",
            CLLWKSRZ: 138.5,
            DH: "6622511035037",
            CZZZRQ: "2015-11-01 00:00:00",
            CLLWKSRY: 139.2,
            PJ_ID: "DX0066220251100037",
            LBYGZPH: "Z",
            LBYLH: null,
            MCZZDW: "105",
            SCZZDW: "105",
            LBZCDH: "CO",
            LBYLX: "9X",
            CLLWHSRY: 32.4,
            CLLWHSRZ: 33.6,
            LBZSXH: "213206",
            CLZJSRY: 805.3,
            MCZZRQ: "2015-12-24 00:00:00",
            CLZJSRZ: 805.2,
            LBYZZRQ: "2015-01-01 00:00:00",
            ZH: "79199",
            LBZLH: null,
            SCZZRQ: "2015-12-24 00:00:00",
            LBZZZRQ: "2015-01-01 00:00:00",
            CZZZDW: "114",
            LBYSXH: "211298",
            ZX: "RE2B",
            LBZLX: "9X",
            LBYCDH: "CO",
          },
        ],
      });
    }

    if (type === "csbts") {
      return ctx.json({
        code: "200",
        msg: "数据读取成功",
        data: [
          {
            CZZZDW: "114",
            CZZZRQ: "2009-10",
            MCZZDW: "131",
            MCZZRQ: "2018-07-09 00:00:00",
            SCZZDW: "131",
            SCZZRQ: "2018-07-09 00:00:00",

            DH: barCode,
            ZH: "73973",
            ZX: "RE2B",
            SRYY: "厂修",
            SRDW: "588",
          },
        ],
      });
    }

    return ctx.json({ message: "no data" }, 500);
  });

  app.post("/api/saveData", (ctx) => {
    const body = ctx.res.json();

    console.log(`
      URL: ${ctx.req.url}
      Body: ${JSON.stringify(body)}
      `);

    return ctx.json({ code: "200", msg: "数据上传成功" });
  });

  Deno.serve(
    {
      hostname: "127.0.0.1",
      port: 8080,
    },
    app.fetch,
  );
};

main();
