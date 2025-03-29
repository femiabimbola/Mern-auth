
import { pgTable, pgEnum, date, text, uuid, varchar, timestamp, boolean } from "drizzle-orm/pg-core"

export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);

export const userPreference = pgTable("userPreference", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  enable2FA: boolean("enable2FA").default(false),
  emailNotification:boolean("emailNotification").default(false),
  twoFactorSecret: boolean("twoFactorSecret").default(false)
})

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isEmailVerified:boolean("isEmailVerified").default(false),
  userPreferenceId: uuid("userPreferenceId").references(() => userPreference.id).notNull(),
  role: ROLE_ENUM("role").default("USER"),
  createdAt: timestamp("created_at", {withTimezone: true,}).defaultNow(),
});