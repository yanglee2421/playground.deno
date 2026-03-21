import { HTTPException } from "@hono/hono/http-exception";
import { logger } from "@hono/hono/logger";
import { factory } from "./factory.ts";

export const createRootApp = () => {
  return factory.createApp().onError((err, ctx) => {
    console.error("Error occurred:", err);

    if (err instanceof HTTPException) {
      return ctx.json({ message: err.message }, err.status);
    }

    return ctx.json({ message: err.message || "Internal Server Error" }, 500);
  }).notFound((ctx) => {
    return ctx.json({ message: "Not Found" }, 404);
  }).use(logger());
};
