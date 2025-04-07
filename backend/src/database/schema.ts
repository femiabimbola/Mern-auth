
import { pgTable, pgEnum, json, text, uuid, varchar, timestamp, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  isEmailVerified: boolean("isEmailVerified").default(false),
  userPreferences: json("userPreferences").default(
    JSON.stringify({
      enable2FA: false,
      emailNotification: false,
      twoFactorSecret: null,
    })
  ), // Embed preferences as a JSON object
  role: text("role").default("USER"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});


export const session = pgTable("session", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("userId").references(() => users.id).notNull(),
  userAgent:text("userAgent"),
  createdAt:timestamp("createdAt", {withTimezone: true,}).defaultNow(),
  expiredAt:timestamp("expiredAt", { withTimezone: true })
  .default(sql`NOW() + INTERVAL '15 days'`).notNull()
})

export const verificationCode = pgTable("verificationCode", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("userId").references(() => users.id).notNull(),
  code:text("code").unique().notNull(),
  type:text("type").notNull(),
  createdAt:timestamp("createdAt", {withTimezone: true,}).defaultNow(),
  expiredAt: timestamp("expiredAt", { withTimezone: true })
  .default(sql`NOW() + INTERVAL '15 minutes'`)
  .notNull()
}) 