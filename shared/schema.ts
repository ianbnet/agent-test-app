import { pgTable, serial, text } from "drizzle-orm/pg-core";

/**
 * The anatomy explorer keeps no server-side data; progress (quiz scores, preferences) lives
 * on the device. This placeholder table keeps drizzle-kit configured for future features
 * such as class rosters or shared quiz sets.
 */
export const meta = pgTable("meta", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
});
