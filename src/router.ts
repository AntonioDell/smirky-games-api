import { Context, FormDataReader, Router, Status, oakCors } from "../deps.ts";
import { hashPassword, verifyPassword } from "./encryption.ts";
import {
  createAuthenticatedSession,
  deleteSession,
  isSessionAuthenticated,
} from "./session.ts";
import { insertContact } from "./db.ts";

const router = new Router();

const highscoresFile = "highscores.json";

router.get("/secret", async (ctx: Context, next) => {
  if (await isSessionAuthenticated(await ctx.state.session)) {
    ctx.response.body = "This is my secret.... I'm BLUE BADADIBA BADU!";
    ctx.response.headers.append("Content-Type", "text/plain");
    ctx.response.status = Status.OK;
  } else {
    ctx.response.body = "No one will know my secret. It is not red...";
    ctx.response.headers.append("Content-Type", "text/plain");
    ctx.response.status = Status.Unauthorized;
  }
  await next();
});

router.post("/register", async (ctx: Context, next) => {
  const formBody = await ctx.request.body({
    contentTypes: { text: ["application/x-www-form-urlencoded"] },
  });

  const userName = (await formBody.value).get("userName");
  const password = (await formBody.value).get("password");

  const passwordHash = await hashPassword(password);

  // save hashed password to db

  ctx.response.body = "You are successfully registered!";
  ctx.response.headers.append("Content-Type", "text/plain");
  ctx.response.status = Status.OK;
  await next();
});

router.post("/login", async (ctx: Context, next) => {
  const formBody = await ctx.request.body({
    contentTypes: { text: ["application/x-www-form-urlencoded"] },
  });

  const userName = (await formBody.value).get("userName");
  const password = (await formBody.value).get("password");

  if (!userName || !password) {
    ctx.response.body = "Missing username/password!";
    ctx.response.headers.append("Content-Type", "text/plain");
    ctx.response.status = Status.Unauthorized;
    await next();
    return;
  }

  const isVerified = await verifyPassword(
    password,
    "000000100000c737cb628d54ef806c1aa7c8127eb00fc7af01d02da5748bb2e13f694aecf177e4583c3d85804a77bcbe79eda2299c8a0d2a",
  );

  if (isVerified) {
    const x = ctx.response.headers;
    ctx.cookies.set("test", "testValue", { maxAge: 60 });
    createAuthenticatedSession(userName, await ctx.state.session);
    ctx.response.body = "You should have received a cookie!";
    ctx.response.headers.append("Content-Type", "text/plain");
    ctx.response.status = Status.OK;
  }

  await next();
});

router.post("/logout", async (ctx: Context, next) => {
  deleteSession(ctx.state.session);
  ctx.response.body = "Session removed!";
  ctx.response.headers.append("Content-Type", "text/plain");
  ctx.response.status = Status.OK;

  await next();
});

router.post("/contact", async (context: Context, next) => {
  console.debug(`Received the following form:`);
  if (!context.request.hasBody) {
    context.response.body = "Contact empty!";
    context.response.headers.append("Content-Type", "text/plain");
    context.response.status = Status.BadRequest;

    await next();
    return;
  }

  const body = context.request.body();
  if (body.type !== "form-data") {
    context.response.body = "Type is no form-data!";
    context.response.headers.append("Content-Type", "text/plain");
    context.response.status = Status.BadRequest;

    await next();
    return;
  }

  const formReader = <FormDataReader> context.request.body().value;
  const form = await formReader.read();

  //await insertContact(form.fields["message"], form.fields["email"], form.fields["name"]);

  context.response.body = "Contact established!";
  context.response.headers.append("Content-Type", "text/plain");
  context.response.status = Status.OK;

  await next();
});

router.get("/test", async (context: Context, next) => {
  context.response.body = "I'm up and running!";
  context.response.headers.append("Content-Type", "text/plain");
  context.response.status = Status.OK;

  await next();
});

router.get("/highscores", oakCors(), async (context: Context, next) => {
  console.log("Test");
  let fileContent;
  try {
    fileContent = await Deno.readTextFile(highscoresFile);
  } catch (error) {
    fileContent = JSON.stringify({ entries: [] });
    await Deno.writeTextFile(highscoresFile, fileContent);
  }

  context.response.body = JSON.parse(fileContent);
  context.response.headers.append("Content-Type", "application/json");
  context.response.status = Status.OK;

  await next();
});

router.post("/highscores", oakCors(), async (context: Context, next) => {
  const body = await context.request.body();

  if (body.type != "json") {
    context.response.body = "Type is no fjson!";
    context.response.headers.append("Content-Type", "text/plain");
    context.response.status = Status.BadRequest;

    await next();
    return;
  }
  const newEntry = await body.value;
  if (
    !newEntry.name || typeof newEntry.name != "string" || !newEntry.score ||
    typeof newEntry.score != "number"
  ) {
    context.response.body = "Given data is not valid!";
    context.response.headers.append("Content-Type", "text/plain");
    context.response.status = Status.BadRequest;

    await next();
    return;
  }

  let highscores;
  try {
    highscores = JSON.parse(await Deno.readTextFile(highscoresFile));
  } catch (error) {
    highscores = { entries: [] };
  }
  const entryToAdd = { name: newEntry.name, score: newEntry.score };
  const lesserScoreIndex = highscores.entries.findIndex((e:any) =>
    e.score < newEntry.score
  );

  let highscoresChanged = false;
  if (highscores.entries.length < 10) {
    const insertIndex = lesserScoreIndex != -1
      ? lesserScoreIndex
      : highscores.entries.length;
    highscores.entries.splice(insertIndex, 0, entryToAdd);
    highscoresChanged = true;
  } else if (lesserScoreIndex != -1) {
    highscores.entries.splice(lesserScoreIndex, 0, entryToAdd);
    highscores.entries.splice(-1, 1);
    highscoresChanged = true;
  }

  if (highscoresChanged) {
    await Deno.writeTextFile(highscoresFile, JSON.stringify(highscores));
  }
  
  context.response.status = Status.OK;
  await next();
});

export default router;
