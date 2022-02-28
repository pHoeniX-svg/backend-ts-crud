import { Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { IUser, TUser } from '~server/types';

const verifyJWT: RequestHandler = (req: unknown, res, next) => {
  let request = req as Request & TUser;
  const authHeader =
    request.headers.authorization || (request.headers.Authorization as string);

  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
    if (err) return res.sendStatus(403); // invalid token: forbidden
    const payload = decoded as {
      UserInfo: IUser;
    };
    request.user = payload.UserInfo.username!;
    request.roles = payload.UserInfo.roles!;
    next();
  });
};

export { verifyJWT };
