import { Router } from "express";

const router = Router();

// GET /api/test
router.get("/test", (req, res) => {
  res.send();
});

export default router;