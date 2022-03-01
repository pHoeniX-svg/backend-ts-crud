import { RequestHandler } from 'express';
import { Employee } from '~server/model';

/**
 * @desc   Get All Employees
 * @route  GET /api/employees
 * @access Public
 */
const getAllEmployees: RequestHandler = async (_req, res) => {
  const employees = await Employee.find();
  if (!employees) {
    return res.status(204).json({ message: 'no employees found' });
  }
  res.json(employees);
};

/**
 * @desc   Get Single Employee
 * @route  GET /api/employees/:id
 * @access Private
 */
const getEmployee: RequestHandler = async (req, res) => {
  const request = req as unknown as Request & {
    params: { id: string };
  };

  if (!request?.params?.id) {
    return res.status(400).json({ message: 'an employee id is required' });
  }

  const employee = await Employee.findOne({
    _id: request.params.id,
  }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${request.params.id}.` });
  }

  res.json(employee);
};

/**
 * @desc   Create An Employee
 * @route  POST /api/employees/
 * @access Private
 */
const createNewEmployee: RequestHandler = async (req: unknown, res) => {
  const request = req as Request & {
    body: { firstname: string; lastname: string };
  };

  if (!request?.body?.firstname || !request?.body?.lastname) {
    return res
      .status(400)
      .json({ message: 'first and last names are required' });
  }
  try {
    const result = await Employee.create({
      firstname: request.body.firstname,
      lastname: request.body.lastname,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};

/**
 * @desc   Update An Employee
 * @route  PUT /api/employees/
 * @access Private
 */
const updateEmployee: RequestHandler = async (req: unknown, res) => {
  const request = req as Request & {
    body: { firstname: string; lastname: string; id: string };
  };

  if (!request?.body?.id) {
    return res.status(400).json({ message: 'an id parameter is required' });
  }

  const employee = await Employee.findOne({
    _id: request.body.id,
  }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `no employee matches the id ${request.body.id}.` });
  }

  if (request?.body?.firstname) {
    employee.firstname = request.body.firstname;
  }

  if (request?.body?.lastname) {
    employee.lastname = request.body.lastname;
  }

  const result = await employee.save();
  res.json(result);
};

/**
 * @desc   Delete An Employee
 * @route  DELETE /api/employees/
 * @access Private
 */
const deleteEmployee: RequestHandler = async (req, res) => {
  const request = req as unknown as Request & {
    body: { id: string };
  };

  if (!request?.body?.id) {
    return res.status(400).json({ message: 'employee id is required' });
  }

  const employee = await Employee.findOne({
    _id: request.body.id,
  }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `no employee matches the id ${request.body.id}.` });
  }

  const result = await employee.deleteOne({ _id: request.body.id });
  res.json(result);
};

export {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
