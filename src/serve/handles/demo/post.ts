import { zValidator } from "@hono/zod-validator";
import z from "zod";
import { factory } from "../../factory.ts";

const bodySchema = z.object({
  id: z.number(),
});

export const post = factory.createHandlers(
  zValidator(
    "json",
    bodySchema,
  ),
  (c) => {
    const data = c.req.valid("json");

    return c.json({ message: "demo", data });
  },
);
