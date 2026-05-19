import { Router } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1);

  if (!user) {
    res.status(404).json({ error: "Portfolio not found" });
    return;
  }

  res.json({
    id: user.id,
    username: user.username,
    templateId: user.templateId,
    profile: user.profile,
    projects: user.projects,
    skills: user.skills,
  });
});

export default router;
