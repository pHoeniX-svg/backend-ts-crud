import { JwtPayload, sign, verify } from 'jsonwebtoken';

const verifyJWTHelper = <T extends { [key: string]: any }>(
  token: string,
  secret: string
) => {
  return verify(token, secret) as JwtPayload & T;
  // this typing allows us to keep both our encoded data and JWT original properties
};

const signJWTHelper = <T extends { [key: string]: any }>(
  payload: T,
  secret: string
): string => {
  return sign(payload, secret);
};
export { verifyJWTHelper, signJWTHelper };
