import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.counter.get.path, async (_req, res) => {
    const counter = await storage.getCount();
    res.json(counter);
  });

  app.post(api.counter.increment.path, async (_req, res) => {
    const counter = await storage.incrementCount();
    res.json(counter);
  });

  return httpServer;
}
