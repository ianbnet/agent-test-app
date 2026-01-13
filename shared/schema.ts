import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const counter = pgTable("counter", {
  id: serial("id").primaryKey(),
  count: integer("count").notNull().default(0),
});

export const insertCounterSchema = createInsertSchema(counter).pick({
  count: true,
});

export type InsertCounter = z.infer<typeof insertCounterSchema>;
export type Counter = typeof counter.$inferSelect;
