export type FormEventType = React.FormEvent<HTMLFormElement>;

export interface IUser {
  username: string;
  password: string;
  roles: number[];
  accessToken?: string;
  refreshToken?: string;
}
