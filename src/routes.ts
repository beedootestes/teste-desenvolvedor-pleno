import { Router } from "express";
import questionRoutes from "./routes/question.routes";
import answersRoutes from "./routes/answers.routes";

const router = Router();

// Base Route
router.get("/", (request, response) => {
  return response.status(200).json({
    success: true,
    Title: "Beedoo Challenge",
    Summary: "Welcome to Beedoo API",
    Version: "1.0",
    Author: "Luís Afonso Caputo from Angola",
  });
});

router.use(questionRoutes);
router.use(answersRoutes);

export default router;
