import { Router } from 'express';
import { PingController } from '../controller/PingController';

export const healthRouter = Router();

const pingController = new PingController();

healthRouter.get('/ping', (req, res) => {
  pingController.handle(req, res);
});