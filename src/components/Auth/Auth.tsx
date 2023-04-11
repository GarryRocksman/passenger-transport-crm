import './Auth.scss';

import React, { useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import { setUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { getUserByAuthId } from '../../api/userFirestore';
import { loadFromLocalStorage } from '../../helpers/localStorageHelper';
import { User } from '../../types/User';

import { AuthWithEmail } from './AuthWithEmail/AuthWithEmail';
import { AuthWithPhone } from './AuthWithPhone/AuthWithPhone';
import { AuthWithGoogle } from './AuthWithGoogle/AuthWithGoogle';
import { AuthWithFacebook } from './AuthWithFacebook';

export const Auth: React.FC = () => {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      auth
    );
  }, []);

  const isUserRegistered = async () => {
    try {
      const authUserFromLocalStorage = loadFromLocalStorage().user;
      const user: User | null = await getUserByAuthId(
        authUserFromLocalStorage.id
      );
      if (user) {
        if (user.role === 'manager') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        navigate('/registration');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(
        setUser({
          email: user.email,
          token: user.getIdTokenResult(),
          id: user.uid,
        })
      );

      isUserRegistered();
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };
  const handleSignUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(
        setUser({
          email: user.email,
          token: await user.getIdToken(),
          id: user.uid,
        })
      );

      isUserRegistered();
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const handleSignInWithEmail = async (
    email: string,
    password: string,
    action: string
  ) => {
    if (action === 'login') {
      handleLogin(email, password);
    } else {
      handleSignUp(email, password);
    }
  };

  const handleSignInnWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      dispatch(
        setUser({
          email: user.email,
          token: token,
          id: user.uid,
        })
      );

      isUserRegistered();
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const handleSignInnWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      dispatch(
        setUser({
          email: user.email ? user.email : user.providerData[0].email,
          token: token,
          id: user.uid,
        })
      );

      isUserRegistered();
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  const handleSignUpWithPhone = async (phoneNumber: string) => {
    const appVerifier = window.recaptchaVerifier;

    await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
      })
      .catch(error => {
        console.error('Error sending verification code:', error);
      });
  };

  const handleSignUpWithPhoneCode = async (verificationCode: string) => {
    const confirmationResult = window.confirmationResult;

    await confirmationResult
      .confirm(verificationCode)
      .then((userCredential: any) => {
        console.log('Phone number verified:', userCredential.user);

        const user = userCredential.user;

        dispatch(
          setUser({
            email: user.email,
            phone: user.phoneNumber,
            token: user.getIdTokenResult(),
            id: user.uid,
          })
        );

        isUserRegistered();
      })
      .catch((error: any) => {
        console.error('Error verifying phone number:', error);
      });
  };

  return (
    <div className="auth">
      <img className="auth__logo" src={logo} alt="Journey Logo" />
      <AuthWithEmail handleClick={handleSignInWithEmail} />
      <AuthWithGoogle handleSignInnWithGoogle={handleSignInnWithGoogle} />
      <AuthWithFacebook handleSignInnWithFacebook={handleSignInnWithFacebook} />
      <AuthWithPhone
        handleClick={handleSignUpWithPhone}
        verifyPhoneNumber={handleSignUpWithPhoneCode}
      />
    </div>
  );
};
