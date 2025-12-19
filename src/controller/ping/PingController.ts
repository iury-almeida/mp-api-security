import { Request, Response } from 'express';

export class PingController {
  public handle(req: Request, res: Response): Response {
    return res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  }
}

 
