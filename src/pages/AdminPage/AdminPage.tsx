import './AdminPage.scss';

import { useEffect, useState } from 'react';

import { UsersTable } from '../../components/UsersTable';
import { SideNavigation } from '../../components/SideNavigation';
import { getAllUsers } from '../../api/userFirestore';
import { User } from '../../types/User';
import { Roles } from '../../types/Roles';
import { Categories } from '../../types/Categories';
import { Trips } from '../../components/Trips';

export const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState<Roles | Categories>(Roles.passenger);
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  const getAllUsersFromDatabase = async () => {
    try {
      setLoading(true);
      const usersFromServer = await getAllUsers();
      setUsers(usersFromServer);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  const handleRoleChange = (categ: Roles | Categories) => {
    setCategory(categ);
  };

  const handleUserUpdate = () => {
    setIsUserUpdated(!isUserUpdated);
  };

  const visibleUsers = users.filter(user => (user.role as Roles) === category);

  useEffect(() => {
    getAllUsersFromDatabase();
  }, []);

  useEffect(() => {
    getAllUsersFromDatabase();
  }, [isUserUpdated]);
  return (
    <div className="admin-page">
      <div className="admin-page__nav">
        <SideNavigation roleChange={handleRoleChange} />
      </div>
      <div className="admin-page__content">
        {category === Categories.trips ? (
          <Trips users={users} />
        ) : (
          <UsersTable
            users={visibleUsers}
            loading={loading}
            error={error}
            userRole={category}
            handleUserUpdate={handleUserUpdate}
          />
        )}
      </div>
    </div>
  );
};
