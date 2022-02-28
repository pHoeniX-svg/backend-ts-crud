export interface IEmployee {
  id: string | number;
  firstname: string;
  lastname: string;
}
export interface IEmployeeData {
  employees: IEmployee[];
  setEmployees: (data: IEmployee[]) => void;
}

export type Role = number[];
export interface IUser {
  username: string;
  password: string;
  roles: {
    User: number;
    Admin?: number;
    Editor?: number;
  };
  refreshToken?: string;
}

export interface TUser {
  user: string;
  pwd: string;
  roles: {
    User: number;
    Admin?: number;
    Editor?: number;
  };
}

export interface IUserData {
  users: IUser[];
  setUsers: (data: IUser[]) => void;
}
