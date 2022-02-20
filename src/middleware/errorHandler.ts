import { NextFunction, Request, Response } from 'express';
import { logEvents } from './logEvents';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(`${err.name}: ${err.message}`, 'errors.log');
  console.error(err.stack);
  res.status(500).send(err.message);
};

export { errorHandler };
