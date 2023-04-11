import './EditedUserTable.scss';

import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { User } from '../../types/User';
import { updateUser } from '../../api/userFirestore';
import { Roles } from '../../types/Roles';

type Props = {
  users: User[];
  handleUserUpdate: () => void;
};

export const EditedUserTable: React.FC<Props> = ({
  users,
  handleUserUpdate,
}) => {
  const [editedUsers, setEditedUsers] = useState<User[]>(users);

  const handleUpdate = async (id: string) => {
    const user = editedUsers.find(foundedUser => foundedUser.id === id);

    console.log(user);

    if (user) {
      await updateUser(id, user);
      handleUserUpdate();
    }
  };
  return (
    <tbody>
      {editedUsers.map((user: User, index) => (
        <tr key={user.id}>
          <td>{index + 1}</td>
          <td>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Control
                type="text"
                value={user.firstName}
                onChange={e =>
                  setEditedUsers(
                    editedUsers.map(u =>
                      u.id === user.id ? { ...u, firstName: e.target.value } : u
                    )
                  )
                }
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Control
                type="text"
                value={user.lastName}
                onChange={e =>
                  setEditedUsers(
                    editedUsers.map(u =>
                      u.id === user.id ? { ...u, lastName: e.target.value } : u
                    )
                  )
                }
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Control
                type="text"
                value={user.phone}
                onChange={e =>
                  setEditedUsers(
                    editedUsers.map(u =>
                      u.id === user.id ? { ...u, phone: e.target.value } : u
                    )
                  )
                }
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                value={user.email}
                onChange={e =>
                  setEditedUsers(
                    editedUsers.map(u =>
                      u.id === user.id ? { ...u, email: e.target.value } : u
                    )
                  )
                }
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="currentLocation">
              <Form.Control
                type="text"
                value={user.currentLocation}
                onChange={e =>
                  setEditedUsers(
                    editedUsers.map(u =>
                      u.id === user.id
                        ? { ...u, currentLocation: e.target.value }
                        : u
                    )
                  )
                }
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="destination">
              <Form.Control
                type="text"
                value={user.destination}
                onChange={e =>
                  setEditedUsers(
                    editedUsers.map(u =>
                      u.id === user.id
                        ? { ...u, destination: e.target.value }
                        : u
                    )
                  )
                }
              />
            </Form.Group>
          </td>
          <td>
            <Form.Group className="mb-3" controlId="role">
              <Form.Select
                value={user.role}
                defaultValue={user.role}
                onChange={e =>
                  setEditedUsers(
                    editedUsers.map(u =>
                      u.id === user.id
                        ? { ...u, role: e.target.value as Roles }
                        : u
                    )
                  )
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
                type="text"
                value={user.carNumber || ''}
                onChange={e =>
                  setEditedUsers(
                    editedUsers.map(u =>
                      u.id === user.id ? { ...u, carNumber: e.target.value } : u
                    )
                  )
                }
              />
            </Form.Group>
          </td>
          <td>
            <Button
              variant="outline-secondary"
              onClick={() => handleUpdate(user.id)}
            >
              Update
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
