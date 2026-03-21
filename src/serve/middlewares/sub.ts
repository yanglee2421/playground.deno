import { factory } from "../factory.ts";

export const subMiddleware = factory.createMiddleware(async (_, next) => {
  await next();
});
