import {  Router } from 'express';
import { answersRoutes } from './answers.routes';
import { questionRoutes } from './questions.routes';

const router = Router();


router.use("/questions", questionRoutes);
router.use("/answers", answersRoutes);


export default router;
