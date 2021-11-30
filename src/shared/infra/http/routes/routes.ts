import {  Router } from 'express';
import { questionRoutes } from './questions.routes';

const router = Router();


router.use("/questions", questionRoutes);


export default router;
