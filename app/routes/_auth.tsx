import {Outlet, Navigate} from 'react-router';
import {useAppSelector} from '@app/store/hooks';

export default function AuthLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);


  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Outlet />
    </div>
  );
}
