import { Context, Next } from "@oak/oak";
import { connectOdoo } from "../config/odoo.ts";

export async function ensureOdooConnection(ctx: Context, next: Next) {
  if (ctx.request.url.pathname.startsWith("/odoo/")) {
    await connectOdoo();
  }
  await next();
}
