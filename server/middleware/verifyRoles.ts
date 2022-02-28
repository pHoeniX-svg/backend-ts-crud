import { NextFunction, Response } from 'express';

const verifyRoles = (...allowedRoles: any[]) => {
  return (req: unknown, res: Response, next: NextFunction) => {
    let request = req as Request & { roles?: number[] };
    if (!request?.roles) return res.sendStatus(401);

    const rolesArray = [...allowedRoles];

    const result = request.roles
      ?.map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if (!result) return res.sendStatus(401);
    next();
  };
};

export { verifyRoles };
