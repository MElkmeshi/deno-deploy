import { Try } from "@fernandoslim/odoo-jsonrpc";
import { odoo } from "../config/odoo.ts";
import { OdooProduct, OdooContact } from "../types/odoo.ts";

export class OdooService {
  static async getProducts() {
    return await Try(() =>
      odoo.searchRead<OdooProduct>(
        "product.template",
        [],
        ["name", "list_price"]
      )
    );
  }

  static async getContacts() {
    return await Try(() =>
      odoo.searchRead<OdooContact>(
        "res.partner",
        [],
        ["name", "email"]
      )
    );
  }

  static async getContactById(id: number) {
    return await Try(() =>
      odoo.read<OdooContact>(
        "res.partner",
        id,
        ["name", "email"]
      )
    );
  }
}
