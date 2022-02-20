import { RequestHandler } from 'express';
import { allowedOrigins } from '~src/config';

const credentials: RequestHandler = (req, res, next) => {
  const origin = req.headers.origin!;
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};

export { credentials };
