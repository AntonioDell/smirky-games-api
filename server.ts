import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = { message: "Hello World!" };
});

console.log("Listening on http://localhost:8001");
await app.listen({ port: 8001 });
