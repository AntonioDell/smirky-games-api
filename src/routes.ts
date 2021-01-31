import { Context } from "https://deno.land/x/oak@v6.5.0/context.ts";

export const login = (ctx: Context) => {
    ctx.response.body = { message: "Hello Nerd!" };
}