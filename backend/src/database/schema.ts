
import { pgTable, pgEnum, text, uuid, varchar, timestamp, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

 const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);

export const userPreference = pgTable("userPreference", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  enable2FA: boolean("enable2FA").default(false),
  emailNotification:boolean("emailNotification").default(false),
  twoFactorSecret: text("twoFactorSecret")
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
  expiredAt:timestamp("expiredAt", { withTimezone: true }).notNull()
}) 