import { Context } from "@oak/oak";
import {
  latLngToCell,
  cellToLatLng,
  gridDisk,
  gridDistance,
  cellToBoundary,
} from "npm:h3-js";

export class H3Controller {
  static geoToH3(ctx: Context) {
    try {
      const url = new URL(ctx.request.url);
      const lat = parseFloat(url.searchParams.get("lat") || "");
      const lng = parseFloat(url.searchParams.get("lng") || "");
      const res = parseInt(url.searchParams.get("res") || "8");

      if (isNaN(lat) || isNaN(lng) || isNaN(res)) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Invalid lat, lng, or res" };
        return;
      }

      const h3 = latLngToCell(lat, lng, res);
      ctx.response.body = { h3 };
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error };
    }
  }

  static kRing(ctx: Context) {
    try {
      const url = new URL(ctx.request.url);
      const h3 = url.searchParams.get("h3") || "";
      const radius = parseInt(url.searchParams.get("radius") || "1");

      if (!h3 || isNaN(radius)) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Invalid h3 or radius" };
        return;
      }

      const neighbors = gridDisk(h3, radius);
      ctx.response.body = { neighbors };
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error: error };
    }
  }

  static h3Distance(ctx: Context) {
    try {
      const url = new URL(ctx.request.url);
      const from = url.searchParams.get("from") || "";
      const to = url.searchParams.get("to") || "";

      if (!from || !to) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Missing from or to H3 index" };
        return;
      }

      const distance = gridDistance(from, to);
      ctx.response.body = { distance };
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error };
    }
  }

  static h3ToGeo(ctx: Context) {
    try {
      const url = new URL(ctx.request.url);
      const h3 = url.searchParams.get("h3") || "";

      if (!h3) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Missing h3 index" };
        return;
      }

      const [lat, lng] = cellToLatLng(h3);
      ctx.response.body = { geo: [lat, lng] };
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error };
    }
  }
  static h3CellToBoundary(ctx: Context) {
    try {
      const url = new URL(ctx.request.url);
      const h3 = url.searchParams.get("h3") || "";

      if (!h3) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Missing h3 index" };
        return;
      }

      const boundary = cellToBoundary(h3, true);
      ctx.response.body = { boundary };
    } catch (error) {
      ctx.response.status = 500;
      ctx.response.body = { error };
    }
  }
}
