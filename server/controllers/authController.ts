import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '~server/model';

/**
 * @desc   Authenticate A User
 * @route  POST /api/auth
 * @access Public
 */
const handleLogin: RequestHandler = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });

  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) {
    return res.sendStatus(401); // 401 = unauthorized
  }

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);

    // create JWTs: JSON Web Token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '10s' }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: '1d' }
    );

    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ roles, accessToken }); // store AT in memory
  } else {
    res.sendStatus(401);
  }
};

export { handleLogin };
