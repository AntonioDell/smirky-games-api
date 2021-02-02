import { Context, Router, Status } from "../deps.ts";
import { hashPassword, verifyPassword } from "./encryption.ts";
import { createAuthenticatedSession, deleteSession, isSessionAuthenticated } from "./session.ts";

const router = new Router();

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
    ctx.cookies.set("test", "testValue", {maxAge: 60})
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
})

export default router;