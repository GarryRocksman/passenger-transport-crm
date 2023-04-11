import './AuthWithPhone.scss';

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

// eslint-disable-next-line max-len
import { handlePhoneNumberChange } from '../../../helpers/handlePhoneNumberValidation';

type Props = {
  handleClick: (phoneNumber: string) => void;
  verifyPhoneNumber: (verificationCode: string) => void;
};
export const AuthWithPhone: React.FC<Props> = ({
  handleClick,
  verifyPhoneNumber,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSignWithPhone, setIsSignWithPhone] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSignInWithPhone = () => {
    setIsSignWithPhone(!isSignWithPhone);
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      {isSignWithPhone ? (
        <>
          <Form
            action="/"
            onSubmit={event => {
              event.preventDefault();
              handleClick(phoneNumber);
              setIsCodeSent(true);
            }}
          >
            <Form.Group className="mb-3" controlId="phone-number">
              <Form.Control
                required={true}
                placeholder="+38(0__)___-__-__"
                name="phone"
                value={phoneNumber}
                onChange={event =>
                  setPhoneNumber(handlePhoneNumberChange(event.target.value))
                }
              />
            </Form.Group>
            <Button className="auth__button" type="submit">
              Send code
            </Button>
          </Form>
          {isCodeSent && (
            <Form
              action="/"
              onSubmit={event => {
                event.preventDefault();
                verifyPhoneNumber(verificationCode);
              }}
            >
              <Form.Group className="mb-3" controlId="verification-code">
                <Form.Control
                  required={true}
                  type="text"
                  placeholder="Verification code"
                  value={verificationCode}
                  onChange={event => setVerificationCode(event.target.value)}
                />
              </Form.Group>
              <Button className="auth__button" type="submit">
                Verify
              </Button>
            </Form>
          )}
        </>
      ) : (
        <Button
          className="auth__button"
          type="submit"
          onClick={handleSignInWithPhone}
        >
          Sign up with Phone verification
        </Button>
      )}
    </div>
  );
};
