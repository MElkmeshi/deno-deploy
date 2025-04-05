import { Router } from "@oak/oak";
import { H3Controller } from "../controllers/h3Controller.ts";

const router = new Router();

router
  .get("/geo-to-h3", H3Controller.geoToH3)
  .get("/kring", H3Controller.kRing)
  .get("/distance", H3Controller.h3Distance)
  .get("/cell-to-boundary", H3Controller.h3CellToBoundary)
  .get("/h3-to-geo", H3Controller.h3ToGeo);

export default router;
