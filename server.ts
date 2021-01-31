import { Application } from "https://deno.land/x/oak/mod.ts";
import { login } from "./src/routes.ts";

const port = 8001;
const app = new Application();

app.use(login);

console.log(`Listening on http://localhost:${port}`);
await app.listen({ port });