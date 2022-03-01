import { RequestHandler } from 'express';
import { User } from '~server/model';

/**
 * @desc   Get All Users
 * @route  GET /api/users
 * @access Private
 */
const getAllUsers: RequestHandler = async (_req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: 'no users found' });
  res.json(users);
};

/**
 * @desc   Get Single User
 * @route  GET /api/users/:id
 * @access Private
 */
const getUser: RequestHandler = async (req, res) => {
  const request = req as unknown as Request & {
    params: { id: string };
  };

  if (!request?.params?.id) {
    return res.status(400).json({ message: 'a user id is required' });
  }

  const user = await User.findOne({
    _id: request.params.id,
  }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `no user matches the id ${request.params.id}.` });
  }

  res.json(user);
};

/**
 * @desc   Delete A User
 * @route  DELETE /api/users/:id
 * @access Private
 */
// NOTE: remember request.body?.id or request.params?.id
const deleteUser: RequestHandler = async (req, res) => {
  const request = req as unknown as Request & {
    body: { id: string };
  };

  if (!request?.body?.id) {
    return res.status(400).json({ message: 'a user id is required' });
  }

  const user = await User.findOne({
    _id: request.body.id,
  }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `no user matches the id ${request.body.id}.` });
  }

  const result = await user.deleteOne({ _id: request.body.id });
  res.json(result);
};
export { getAllUsers, getUser, deleteUser };
