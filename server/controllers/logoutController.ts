import { RequestHandler } from 'express';
import { User } from '~server/model';

const handleLogout: RequestHandler = async (req, res) => {
  // on client side, also delete the access token

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // successful but no content
  const refreshToken = cookies.jwt as string;

  // is refresh token in db?
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return res.sendStatus(204); // successful but no content
  }

  // delete refresh token from db
  foundUser.refreshToken = '';
  const result = await foundUser.save();
  console.log(result);

  // in production, this should be set to secure: true
  // since the refresh token is sent over the https network
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  res.sendStatus(204); // successful but no content
};

export { handleLogout };
