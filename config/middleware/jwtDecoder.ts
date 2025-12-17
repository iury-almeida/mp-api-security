import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: unknown;
}

export function jwtDecoder(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return next();
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    // eslint-disable-next-line no-console
    console.warn('JWT_SECRET não configurado. Token não será validado.');
    return next();
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (error) {
    // Token inválido: apenas segue sem usuário autenticado
    // eslint-disable-next-line no-console
    console.warn('Falha ao decodificar JWT:', error);
  }

  return next();
}


