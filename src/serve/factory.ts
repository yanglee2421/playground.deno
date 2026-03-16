import { createFactory } from "@hono/hono/factory";

interface Env {
  Variables: {
    foo: string;
  };
}

export const factory = createFactory<Env>();
