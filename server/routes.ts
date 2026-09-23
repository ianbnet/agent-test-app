import type { Express } from "express";
import type { Server } from "http";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // The explorer is a fully static client (it also ships inside the iOS/Android apps);
  // the server only hosts it during development and for web deployments.
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  return httpServer;
}
