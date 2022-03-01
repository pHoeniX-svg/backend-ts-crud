import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '~server/model';

/**
 * @desc   Get Refresh Token
 * @route  GET /api/refresh
 * @access Private
 */
const handleRefreshToken: RequestHandler = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); // unauthorized
  const refreshToken = cookies.jwt as string;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    return res.sendStatus(403); // forbidden
  }

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    (err, decoded) => {
      const payload = decoded as { username?: string };

      if (err || foundUser.username !== payload.username) {
        return res.sendStatus(403); // invalid token: forbidden
      }

      const roles = Object.values(foundUser.roles);

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: payload.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '240s' }
      );

      res.json({ accessToken });
    }
  );
};

export { handleRefreshToken };
