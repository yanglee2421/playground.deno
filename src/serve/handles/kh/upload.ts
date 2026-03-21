import { factory } from "../../factory.ts";

export const upload = factory.createHandlers(async (ctx) => {
  const data = await ctx.req.json();
  console.log(data);

  return ctx.json({ code: 200, msg: "数据上传成功" });
});
