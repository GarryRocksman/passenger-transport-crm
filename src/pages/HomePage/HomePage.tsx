import './HomePage.scss';

import { Navigate } from 'react-router-dom';
import { removeUser } from 'store/slices/userSlice';
import { Button } from 'react-bootstrap';

import { useAuth } from '../../hooks/use-auth';
import { useAppDispatch } from '../../hooks/redux-hooks';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { isAuth, email } = useAuth();

  const handleLogout = () => {
    dispatch(removeUser());
  };
  return (
    <div className="home-page">
      {isAuth ? (
        <div className="home-page__container">
          <h1 className="home-page__header">Welcome: {email}</h1>
          <Button onClick={handleLogout}>Log out</Button>
        </div>
      ) : (
        <Navigate to="/auth" />
      )}
    </div>
  );
};
