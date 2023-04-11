import './RegistrationForm.scss';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import { Roles } from '../../types/Roles';
import { createUser } from '../../api/userFirestore';
import { User } from '../../types/User';
import { loadFromLocalStorage } from '../../helpers/localStorageHelper';

export const RegistrationForm = () => {
  const authUserFromLocalStorage = loadFromLocalStorage().user;
  const navigate = useNavigate();

  const [role, setRole] = useState(Roles.passenger);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(authUserFromLocalStorage.email || '');
  const [phone, setPhone] = useState(authUserFromLocalStorage.phone || '');
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [carNumber, setCarNumber] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value as Roles);
  };

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();

    const user: Omit<User, 'id'> = {
      authId: authUserFromLocalStorage.id,
      firstName: name,
      lastName: lastName,
      phone: phone,
      email: email,
      carNumber: carNumber || null,
      currentLocation: location,
      destination: destination,
      role: role,
    };

    try {
      await createUser(user);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputPhoneNumber = event.target.value;
    const phoneRegex = /^[0-9\s\-\+\(\)]*$/;

    if (phoneRegex.test(inputPhoneNumber)) {
      setPhone(inputPhoneNumber);
    } else {
      console.log('Invalid phone number');
    }
  };

  return (
    <Form className="registration-form" action="/" onSubmit={handleCreateUser}>
      <h1 className="registration-form__title">Registration Form</h1>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label htmlFor="name">First name</Form.Label>
        <Form.Control
          required={true}
          type="text"
          placeholder="First name"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label htmlFor="lastName">Last name</Form.Label>
        <Form.Control
          required={true}
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          required={true}
          type="email"
          placeholder="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label htmlFor="phone">Phone</Form.Label>
        <Form.Control
          required={true}
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={handlePhoneNumberChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="location">
        <Form.Label htmlFor="location">Current Location</Form.Label>
        <Form.Control
          required={true}
          type="text"
          placeholder="Current Location"
          value={location}
          onChange={event => setLocation(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="destination">
        <Form.Label htmlFor="destination">Destination</Form.Label>
        <Form.Control
          required={true}
          type="text"
          placeholder="Destonation"
          value={destination}
          onChange={event => setDestination(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="passenger">
        <Form.Label htmlFor="passenger" className="registration-form__label">
          <Form.Check
            required={true}
            type="radio"
            name="role"
            value="passenger"
            checked={role === Roles.passenger}
            onChange={handleChange}
          />
          Passenger
        </Form.Label>
        <Form.Label htmlFor="driver">
          <Form.Check
            type="radio"
            name="role"
            value="driver"
            checked={role === Roles.driver}
            onChange={handleChange}
          />
          Driver
        </Form.Label>
        {role === Roles.driver && (
          <Form.Group className="mb-3" controlId="carNumber">
            <Form.Label htmlFor="carNumber">Car number</Form.Label>
            <Form.Control
              required={true}
              type="text"
              placeholder="Car number"
              value={carNumber}
              onChange={event => setCarNumber(event.target.value)}
            />
          </Form.Group>
        )}
      </Form.Group>
      <Button className="registration-form__button" type="submit">
        Register
      </Button>
    </Form>
  );
};
