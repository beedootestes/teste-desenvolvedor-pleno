import { Router } from 'express';

import SentenceRoutes from '@modules/sentence/infra/http/routes/SentenceRoutes';

const routes = Router();

routes.use('/sentences', SentenceRoutes);

export default routes;
