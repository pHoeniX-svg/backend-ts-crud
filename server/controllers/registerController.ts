import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import { User } from '~server/model';
import { IUser } from '~server/types';

/**
 * @desc   Create A User
 * @route  POST /api/register
 * @access Public
 */
const handleRegisterNewUser: RequestHandler = async (req, res) => {
  const { user, pwd } = req.body as Request & { user: string; pwd: string };

  if (!user || !pwd) {
    return res
      .status(400)
      .json({ message: 'username and password are required' });
  }

  //check for duplicate usernames in db
  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate) {
    return res.sendStatus(409); // 409 = conflict
  }

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 16);

    // create and store the new user
    const result: Promise<IUser> = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);

    res.status(201).json({ success: `new user ${user} created!` });
  } catch (error) {
    let err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export { handleRegisterNewUser };
