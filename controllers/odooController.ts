import { Context, RouterContext } from "@oak/oak";
import { OdooService } from "../services/odooService.ts";

export class OdooController {
  static index(ctx: Context){
    ctx.response.status = 200;
    ctx.response.body = "Hello Odoo!";
  }
  static async getProducts(ctx: Context) {
    const [products, error] = await OdooService.getProducts();

    if (error) {
      ctx.response.status = 422;
      ctx.response.body = error.message;
      return;
    }

    if (products.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = "not found";
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = products;
  }

  static async getContacts(ctx: Context) {
    const [contacts, error] = await OdooService.getContacts();

    if (error) {
      ctx.response.status = 422;
      ctx.response.body = error.message;
      return;
    }

    if (contacts.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = "not found";
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = contacts;
  }

  static async getContactById(ctx: RouterContext<string>) {
    const id = ctx.params.id;
    
    const [contacts, error] = await OdooService.getContactById(parseInt(id));

    if (error) {
      ctx.response.status = 422;
      ctx.response.body = error.message;
      return;
    }

    if (contacts.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = "not found";
      return;
    }

    const [contact] = contacts;
    ctx.response.status = 200;
    ctx.response.body = contact;
  }
}
