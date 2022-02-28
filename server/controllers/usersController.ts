import { RequestHandler } from 'express';
import { User } from '~server/model';

/**
 * METHOD: GET => Get All Users
 */
const getAllUsers: RequestHandler = async (_req, res) => {
  const users = await User.find();
  if (users) return res.status(204).json({ message: 'no users found' });
  res.json(users);
};

/**
 * METHOD: GET => Get Single User
 */
const getUser: RequestHandler = async (req, res) => {
  const request = req as unknown as Request & {
    params: { id: string };
  };

  if (!request?.params?.id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const user = await User.findOne({
    _id: request.params.id,
  }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `No user matches ID ${request.params.id}.` });
  }

  res.json(user);
};

/**
 * METHOD: DELETE => Delete User
 */
const deleteUser: RequestHandler = async (req, res) => {
  const request = req as unknown as Request & {
    body: { id: string };
  };

  if (!request?.body?.id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const user = await User.findOne({
    _id: request.body.id,
  }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `No user matches ID ${request.body.id}.` });
  }

  const result = await user.deleteOne({ _id: request.body.id });
  res.json(result);
};
export { getAllUsers, getUser, deleteUser };
