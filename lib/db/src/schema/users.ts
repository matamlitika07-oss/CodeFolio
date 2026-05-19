import { pgTable, serial, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export interface SocialLinks {
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  website?: string | null;
}

export interface UserProfile {
  name?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  resumeUrl?: string | null;
  domain?: string | null;
  socialLinks?: SocialLinks;
}

export interface UserProject {
  id: string;
  title: string;
  description?: string | null;
  techStack?: string[];
  repoLink?: string | null;
  liveLink?: string | null;
  screenshotUrl?: string | null;
}

export interface UserSkills {
  frontend?: string[];
  backend?: string[];
  devops?: string[];
  other?: string[];
}

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  templateId: text("template_id").notNull().default("minimalist"),
  contactEmail: text("contact_email"),
  profile: jsonb("profile").$type<UserProfile>().default({}),
  projects: jsonb("projects").$type<UserProject[]>().default([]),
  skills: jsonb("skills").$type<UserSkills>().default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;
