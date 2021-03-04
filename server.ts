import { Application, logger, oakCors } from "./deps.ts";
import router from "./src/router.ts";
import { registerSessionMiddleWare } from "./src/session.ts";

const port = parseInt(Deno.env.get("PORT") || "8001");
const app = new Application();

await registerSessionMiddleWare(app);

if (Deno.args[0] === "dev") {
  console.log("Allow cors");
  app.use(oakCors({ origin: "*" }));
}
app.use(router.routes());
app.use(router.allowedMethods());
app.use(logger.logger);

console.log(`Listening on http://localhost:${port}`);
await app.listen({ port });
