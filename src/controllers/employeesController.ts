import { RequestHandler } from 'express';
import { Employee } from '~src/model';
import { IUser } from '~src/types';

/**
 * METHOD: GET => Get All Employees
 */
const getAllEmployees: RequestHandler = async (_req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: 'no employees found' });
  res.json(employees);
};

/**
 * METHOD: GET => Get Single Employee
 */
const getEmployee: RequestHandler = async (req, res) => {
  const request = req as unknown as Request & {
    params: { id: string };
  };

  if (!request?.params?.id) {
    return res.status(400).json({ message: 'Employee ID is required' });
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
 * METHOD: POST => Create Employee
 */
const createNewEmployee: RequestHandler = async (req: unknown, res) => {
  const request = req as Request & {
    body: { firstname: string; lastname: string };
  };

  if (!request?.body?.firstname || !request?.body?.lastname) {
    return res.status(400).json({ message: 'first and last names required' });
  }
  try {
    const result: Promise<IUser> = await Employee.create({
      firstname: request.body.firstname,
      lastname: request.body.lastname,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
  }
};

/**
 * METHOD: PUT => Update Employee
 */
const updateEmployee: RequestHandler = async (req: unknown, res) => {
  const request = req as Request & {
    body: { firstname: string; lastname: string; id: string };
  };

  if (!request?.body?.id) {
    return res.status(400).json({ message: 'ID parameter is required' });
  }

  const employee = await Employee.findOne({
    _id: request.body.id,
  }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${request.body.id}.` });
  }

  if (request.body?.firstname) {
    employee.firstname = request.body.firstname;
  }

  if (request.body?.lastname) {
    employee.lastname = request.body.lastname;
  }

  const result = await employee.save();
  res.json(result);
};

/**
 * METHOD: DELETE => Delete an Employee
 */
const deleteEmployee: RequestHandler = async (req, res) => {
  const request = req as unknown as Request & {
    body: { id: string };
  };

  if (!request?.body?.id) {
    return res.status(400).json({ message: 'Employee ID is required' });
  }

  const employee = await Employee.findOne({
    _id: request.body.id,
  }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `No employee matches ID ${request.body.id}.` });
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
