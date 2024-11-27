import { Router } from "@oak/oak";
import { OdooController } from "../controllers/odooController.ts";

const router = new Router();

router
  .get("/", OdooController.index)
  .get("/odoo/products", OdooController.getProducts)
  .get("/odoo/contacts", OdooController.getContacts)
  .get("/odoo/contacts/:id", OdooController.getContactById);

export default router;
