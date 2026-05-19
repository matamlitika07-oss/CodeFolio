import { Router } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";
import { authMiddleware, type AuthRequest } from "../middlewares/authMiddleware";
import {
  UpdateProfileBody,
  UpdateProjectsBody,
  UpdateSkillsBody,
  UpdateTemplateBody,
  SendContactBody,
  SendContactParams,
} from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router = Router();

function toPublicUser(user: typeof usersTable.$inferSelect) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    templateId: user.templateId,
    profile: user.profile,
    projects: user.projects,
    skills: user.skills,
  };
}

router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, req.userId!))
    .limit(1);

  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }

  res.json(toPublicUser(user));
});

router.put("/profile", authMiddleware, async (req: AuthRequest, res) => {
  const parse = UpdateProfileBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const { contactEmail, templateId, profile } = parse.data;

  const updates: Partial<typeof usersTable.$inferInsert> = {};
  if (contactEmail !== undefined) updates.contactEmail = contactEmail ?? undefined;
  if (templateId !== undefined) updates.templateId = templateId ?? undefined;
  if (profile !== undefined) updates.profile = profile as typeof usersTable.$inferInsert["profile"];

  const [user] = await db
    .update(usersTable)
    .set(updates)
    .where(eq(usersTable.id, req.userId!))
    .returning();

  res.json(toPublicUser(user));
});

router.put("/projects", authMiddleware, async (req: AuthRequest, res) => {
  const parse = UpdateProjectsBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const [user] = await db
    .update(usersTable)
    .set({ projects: parse.data.projects as typeof usersTable.$inferInsert["projects"] })
    .where(eq(usersTable.id, req.userId!))
    .returning();

  res.json(toPublicUser(user));
});

router.put("/skills", authMiddleware, async (req: AuthRequest, res) => {
  const parse = UpdateSkillsBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const [user] = await db
    .update(usersTable)
    .set({ skills: parse.data.skills as typeof usersTable.$inferInsert["skills"] })
    .where(eq(usersTable.id, req.userId!))
    .returning();

  res.json(toPublicUser(user));
});

router.put("/template", authMiddleware, async (req: AuthRequest, res) => {
  const parse = UpdateTemplateBody.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const [user] = await db
    .update(usersTable)
    .set({ templateId: parse.data.templateId })
    .where(eq(usersTable.id, req.userId!))
    .returning();

  res.json(toPublicUser(user));
});

router.post("/contact/:username", async (req, res) => {
  const paramsResult = SendContactParams.safeParse(req.params);
  if (!paramsResult.success) {
    res.status(400).json({ error: "Invalid username" });
    return;
  }

  const bodyResult = SendContactBody.safeParse(req.body);
  if (!bodyResult.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const { username } = paramsResult.data;
  const { senderName, senderEmail, message } = bodyResult.data;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const recipientEmail = user.contactEmail || user.email;

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: `"CodeFolio" <${process.env.EMAIL_USER}>`,
        to: recipientEmail,
        subject: `New contact from ${senderName} via CodeFolio`,
        text: `From: ${senderName} <${senderEmail}>\n\n${message}`,
      });
    } catch (err) {
      logger.warn({ err }, "Email send failed, logging instead");
      logger.info({ to: recipientEmail, from: senderEmail, senderName, message }, "Contact message");
    }
  } else {
    logger.info({ to: recipientEmail, from: senderEmail, senderName, message }, "Contact message (no SMTP configured)");
  }

  res.json({ success: true });
});

export default router;
