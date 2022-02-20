import { format } from 'date-fns';
import { RequestHandler } from 'express';
import fs, { promises } from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

const logEvents = async (message: string, logName: string) => {
  const dateTime = `${format(new Date(), 'yyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await promises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await promises.appendFile(
      path.join(__dirname, '..', 'logs', logName),
      logItem
    );
  } catch (error) {
    console.error(error);
  }
};

const logger: RequestHandler = (req, _res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'requests.log');
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logEvents, logger };
