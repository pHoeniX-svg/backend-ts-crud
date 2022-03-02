import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from '~src/api/axios';
import { IUser } from '~src/types';

export const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get('/users', {
          signal: controller.signal,
        });
        console.log(response?.data);
        isMounted && setUsers(response?.data);
      } catch (error) {
        const e = error as AxiosError;
        console.error(e);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users?.map((user) => (
            <li key={uuidv4()}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <br />
    </article>
  );
};
