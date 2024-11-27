import OdooJSONRpc from "@fernandoslim/odoo-jsonrpc";
import "jsr:@std/dotenv/load";

export const odoo = new OdooJSONRpc();

export const connectOdoo = async () => {
  if (!odoo.is_connected) {
    await odoo.connect({
      baseUrl: Deno.env.get("ODOO_BASE_URL"),
      port: Number(Deno.env.get("ODOO_PORT")),
      db: Deno.env.get("ODOO_DB"),
      username: Deno.env.get("ODOO_USERNAME"),
      password: Deno.env.get("ODOO_PASSWORD"),
    });
  }
};