import { factory } from "../../factory.ts";

export const post = factory.createHandlers(
  async (c) => {
    const data = await c.req.json();

    console.log(data);

    return c.json({ msg: "demo", code: 200 });
  },
);
