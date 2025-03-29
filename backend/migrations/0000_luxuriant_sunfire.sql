CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "userPreference" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"enable2FA" boolean DEFAULT false,
	"emailNotification" boolean DEFAULT false,
	"twoFactorSecret" boolean DEFAULT false,
	CONSTRAINT "userPreference_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"isEmailVerified" boolean DEFAULT false,
	"userPreferenceId" uuid NOT NULL,
	"role" "role" DEFAULT 'USER',
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_userPreferenceId_userPreference_id_fk" FOREIGN KEY ("userPreferenceId") REFERENCES "public"."userPreference"("id") ON DELETE no action ON UPDATE no action;