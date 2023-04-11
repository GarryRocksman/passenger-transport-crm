import './AuthWithGoogle.scss';

import React from 'react';
import { Button } from 'react-bootstrap';

import googleLogo from '../../../assets/images/google.png';

type Props = {
  handleSignInnWithGoogle: () => void;
};

export const AuthWithGoogle: React.FC<Props> = ({
  handleSignInnWithGoogle,
}) => {
  return (
    <Button
      variant="outline-primary"
      className="auth__button"
      onClick={handleSignInnWithGoogle}
    >
      <img className="google-logo" src={googleLogo} alt="Google logo" />
      Sign up with Google
    </Button>
  );
};
