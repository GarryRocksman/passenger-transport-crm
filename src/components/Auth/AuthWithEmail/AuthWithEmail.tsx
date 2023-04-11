import './AuthWithEmail.scss';

import React, { useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';

type Props = {
  handleClick: (email: string, password: string, action: string) => void;
};
export const AuthWithEmail: React.FC<Props> = ({ handleClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userAction, setUserAction] = useState('login');

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { innerText } = event.currentTarget;
    setUserAction(innerText.toLowerCase());
  };

  return (
    <Form
      action="/"
      onSubmit={event => {
        event.preventDefault();
        handleClick(email, password, userAction);
      }}
    >
      <Form.Group className="mb-3" controlId="email">
        <Form.Control
          required={true}
          type="email"
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
          placeholder="email"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Control
          required={true}
          type="password"
          value={password}
          onChange={event => {
            setPassword(event.target.value);
          }}
          placeholder="password"
        />
      </Form.Group>
      <ButtonGroup
        className="auth__button"
        aria-label="Login registration buttons"
      >
        <Button type="submit" variant="primary" onClick={handleButtonClick}>
          Login
        </Button>
        <Button type="submit" variant="secondary" onClick={handleButtonClick}>
          Register
        </Button>
      </ButtonGroup>
    </Form>
  );
};
