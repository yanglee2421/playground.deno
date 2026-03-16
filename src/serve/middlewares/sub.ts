import { factory } from "../factory.ts";

const devLog = (...args: unknown[]) => {
  console.log.bind(console)(...args);
};

export const subMiddleware = factory.createMiddleware(async (ctx, next) => {
  await next();

  const body = await ctx.req.json();

  devLog(`
        URL: ${ctx.req.url}
        Body: ${JSON.stringify(body)}`);
});
