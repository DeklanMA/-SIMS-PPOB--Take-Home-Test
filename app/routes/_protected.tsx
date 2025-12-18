import {Outlet, Navigate, useNavigation} from 'react-router';
import {useAppSelector} from '../store/hooks';
import Navbar from '~/components/common/Navbar';
import PageLoader from '~/components/common/PageLoader';

export default function ProtectedLayout() {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const navigation = useNavigation();

  if (!isAuth) return <Navigate to="/login" replace />;

  return (
    <div className="app-layout w-full bg-white ">
      <Navbar />

      {navigation.state === 'loading' && <PageLoader />}

      <main className="bg-white min-h-screen  mx-auto w-full max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
}
