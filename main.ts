import { Application } from "@oak/oak";
import { ensureOdooConnection } from "./middleware/odooConnection.ts";
import postRoutes from "./routes/postRoutes.ts";
import odooRoutes from "./routes/odooRoutes.ts";
import h3Routes from "./routes/h3Router.ts";
const app = new Application();

// Middleware
app.use(ensureOdooConnection);

// Routes
app.use(odooRoutes.routes());
app.use(odooRoutes.allowedMethods());
app.use(postRoutes.routes());
app.use(postRoutes.allowedMethods());
app.use(h3Routes.routes());
app.use(h3Routes.allowedMethods());

// Start server
console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });
