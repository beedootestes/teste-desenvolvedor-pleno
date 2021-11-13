import { Router } from "express";

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

export default router;
