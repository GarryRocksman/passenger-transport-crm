import './EditedUserTable.scss';

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import cn from 'classnames';

import { User } from '../../types/User';
import { updateUser } from '../../api/userFirestore';
import { Roles } from '../../types/Roles';
// eslint-disable-next-line max-len
import { handlePhoneNumberChange } from '../../helpers/handlePhoneNumberValidation';

type Props = {
  users: User[];
};

export const EditedUserTable: React.FC<Props> = ({ users }) => {
  const [editedUsers, setEditedUsers] = useState<User[]>([]);
  const [visibleUsers, setVisibleUsers] = useState<User[]>(users);

  const [inputValidity, setInputValidity] = useState({
    firstName: true,
    lastName: true,
    phone: true,
    email: true,
    currentLocation: true,
    destination: true,
    role: true,
    carNumber: true,
  });

  const handleUpdate = async (userId: string) => {
    const isValid = Object.values(inputValidity).every(value => value);
    if (isValid) {
      const user = editedUsers.find(u => u.id === userId);
      if (user) {
        await updateUser(userId, user);
        setEditedUsers(editedUsers.filter(u => u.id !== userId));
      }
    }
  };

  const handleChange = (user: User, field: string, value: string) => {
    const isUserEdited = editedUsers.find(u => u.id === user.id);

    setInputValidity(prevState => ({
      ...prevState,
      [field]: value.trim() !== '',
    }));

    if (user) {
      if (field === 'phone') {
        value = handlePhoneNumberChange(value);
      }

      setVisibleUsers(
        visibleUsers.map((u: User) => {
          if (u.id === user.id) {
            const updatedUser = { ...u, [field]: value };
            if (isUserEdited) {
              setEditedUsers(
                editedUsers.map((editedUser: User) => {
                  if (editedUser.id === user.id) {
                    return updatedUser;
                  }
                  return editedUser;
                })
              );
              return updatedUser;
            } else {
              setEditedUsers((prevState: User[]) => [
                ...prevState,
                updatedUser,
              ]);
              return updatedUser;
            }
          }
          return u;
        })
      );
    }
  };
  return (
    <tbody className="edited-form">
      {visibleUsers.map((user: User, index) => (
        <tr key={user.id}>
          <td>{index + 1}</td>
          <td>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Control
                className={cn('edited-form__input', {
                  'edited-form__input--danger':
                    !inputValidity.firstName && user.firstName.trim() === '',
                })}
                required={true}
                type="text"
                value={user.firstName}
                onChange={event =>
                  handleChange(user, 'firstName', event.target.value)
                }
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Control
                className={cn('edited-form__input', {
                  'edited-form__input--danger':
                    !inputValidity.lastName && user.lastName.trim() === '',
                })}
                required={true}
                type="text"
                value={user.lastName}
                onChange={event =>
                  handleChange(user, 'lastName', event.target.value)
                }
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Control
                className={cn('edited-form__input', {
                  'edited-form__input--danger':
                    !inputValidity.phone && user.phone.trim() === '',
                })}
                required={true}
                type="tel"
                placeholder="+38(0__)___-__-__"
                value={user.phone}
                onChange={event =>
                  handleChange(user, 'phone', event.target.value)
                }
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                className={cn('edited-form__input', {
                  'edited-form__input--danger':
                    !inputValidity.email && user.email.trim() === '',
                })}
                required={true}
                type="email"
                value={user.email}
                onChange={event =>
                  handleChange(user, 'email', event.target.value)
                }
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="currentLocation">
              <Form.Control
                className={cn('edited-form__input', {
                  'edited-form__input--danger':
                    !inputValidity.currentLocation &&
                    user.currentLocation.trim() === '',
                })}
                required={true}
                type="text"
                value={user.currentLocation}
                onChange={event =>
                  handleChange(user, 'currentLocation', event.target.value)
                }
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="destination">
              <Form.Control
                className={cn('edited-form__input', {
                  'edited-form__input--danger':
                    !inputValidity.destination &&
                    user.destination.trim() === '',
                })}
                required={true}
                type="text"
                value={user.destination}
                onChange={event =>
                  handleChange(user, 'destination', event.target.value)
                }
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="role">
              <Form.Select
                required={true}
                value={user.role}
                defaultValue={user.role}
                onChange={event =>
                  handleChange(user, 'role', event.target.value as Roles)
                }
              >
                <option value={Roles.passenger}>Passenger</option>
                <option value={Roles.driver}>Driver</option>
                <option value={Roles.manager}>Manager</option>
              </Form.Select>
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="carNumber">
              <Form.Control
                className={cn('edited-form__input', {
                  'edited-form__input--danger':
                    !inputValidity.carNumber &&
                    user.carNumber?.trim() === '' &&
                    user.role === Roles.driver,
                })}
                required={true}
                type="text"
                value={user.carNumber || ''}
                onChange={event =>
                  handleChange(user, 'carNumber', event.target.value)
                }
              />
            </Form.Group>
          </td>
          <td>
            <Button
              type="submit"
              variant={
                editedUsers.includes(user)
                  ? 'outline-success'
                  : 'outline-secondary'
              }
              onClick={() => handleUpdate(user.id)}
            >
              {editedUsers.includes(user) ? 'Save' : 'Update'}
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
