import { useAppSelector } from './redux-hooks';

export const useAuth = () => {
  const { email, phone, token, id } = useAppSelector(state => state.user);

  return {
    isAuth: !!id,
    email,
    phone,
    token,
    id,
  };
};
