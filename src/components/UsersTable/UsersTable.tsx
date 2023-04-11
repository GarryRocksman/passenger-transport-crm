import './UsersTable.scss';

import React from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

import { User } from '../../types/User';
import { EditedUserTable } from '../EditedUserTable/EditedUserTable';

type Props = {
  users: User[];
  loading: boolean;
  error: string;
  userRole: string;
  handleUserUpdate: () => void;
};
export const UsersTable: React.FC<Props> = ({
  users,
  loading,
  error,
  userRole,
  handleUserUpdate,
}) => {
  const [isEditable, setIsEditable] = React.useState(false);
  const tableHeader = userRole === 'passenger' ? 'Passengers' : 'Drivers';

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
    handleUserUpdate();
  };

  return (
    <div className="user-table">
      <h1>{tableHeader}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Location</th>
              <th>Destination</th>
              <th>Role</th>
              <th>Car number</th>
            </tr>
          </thead>
          {!isEditable && (
            <tbody>
              {users.map((user: User, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.currentLocation}</td>
                  <td>{user.destination}</td>
                  <td>{user.role}</td>
                  <td>{user.carNumber}</td>
                </tr>
              ))}
            </tbody>
          )}
          {isEditable && <EditedUserTable users={users} />}
        </Table>
      )}

      <Button className="btn-primary" onClick={toggleEditMode}>
        {isEditable ? 'Back' : 'Edit table'}
      </Button>
    </div>
  );
};
