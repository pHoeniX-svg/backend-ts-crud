import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAxiosPrivate } from '~src/hooks';
import { IUser } from '~src/types';

export const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const axiosPrivate = useAxiosPrivate();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });
        console.log(response?.data);
        isMounted && setUsers(response?.data);
      } catch (error) {
        const e = error as AxiosError;
        console.error(e);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

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
