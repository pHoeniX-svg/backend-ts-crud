import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '~src/hooks';

type Props = {
  allowedRoles: number[];
};

const RequireAuth = ({ allowedRoles }: Props) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export { RequireAuth };
