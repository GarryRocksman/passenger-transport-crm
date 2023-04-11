import './AuthWithFacebook.scss';

import React from 'react';
import { Button } from 'react-bootstrap';

import facebookLogo from '../../../assets/images/facebook.png';

type Props = {
  handleSignInnWithFacebook: () => void;
};

export const AuthWithFacebook: React.FC<Props> = ({
  handleSignInnWithFacebook,
}) => {
  return (
    <Button
      variant="outline-primary"
      className="auth__button"
      onClick={handleSignInnWithFacebook}
    >
      <img className="google-logo" src={facebookLogo} alt="Google logo" />
      Sign up with Facebook
    </Button>
  );
};
