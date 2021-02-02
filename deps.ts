export { Context } from "https://deno.land/x/oak@v6.5.0/context.ts";
export { Router } from "https://deno.land/x/oak@v6.5.0/router.ts";

// std
export { Status } from "https://deno.land/std@0.85.0/http/http_status.ts";
export type { Cookie } from "https://deno.land/std/http/cookie.ts";
import cryptoImport from "https://deno.land/std@0.85.0/node/crypto.ts";
export type { CookiesSetDeleteOptions } from "https://deno.land/x/oak@v6.5.0/mod.ts";
export { Application } from "https://deno.land/x/oak@v6.5.0/mod.ts";
import loggerImport from "https://deno.land/x/oak_logger@1.0.0/mod.ts";
export const logger = loggerImport;

export const crypto = cryptoImport;
export { Buffer } from "http://deno.land/x/node_buffer@1.1.0/index.ts";

/**
 * Using crypto.pbkdf2 results in very bad performance, regardless of settings.
 * Because of this, we use the default pbkdf2 node package through jspm.
 */
import { pbkdf2 as pbkdf2Import } from "https://jspm.dev/pbkdf2";
export const pbkdf2: any = pbkdf2Import;

export {
  Session,
  SessionData,
} from "https://raw.githubusercontent.com/revgum/session/master/mod.ts";
