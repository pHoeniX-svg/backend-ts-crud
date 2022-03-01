import { RequestHandler } from 'express';
import { allowedOrigins } from '~server/config';

const credentials: RequestHandler = (req, res, next) => {
  const origin = req.headers.origin!;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};

export { credentials };
