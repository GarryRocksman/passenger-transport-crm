import './Trips.scss';

import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import { Trip } from '../../types/Trip';
import { createTrip, getAllTrips } from '../../api/tripFirestor';
import { User } from '../../types/User';
import { Roles } from '../../types/Roles';
import { TripsTable } from '../TripsTable/TripsTable';
import { AddTripForm } from '../AddTripForm/AddTripForm';

type TripsProps = {
  users: User[];
};
export const Trips: React.FC<TripsProps> = ({ users }) => {
  const drivers = users.filter(user => (user.role as Roles) === Roles.driver);
  const [showAddTripForm, setShowAddTripForm] = useState(false);
  const [trips, setTrips] = useState<Trip[]>([]);

  const getTripsFromDatabase = async () => {
    const tripsFromServer = await getAllTrips();
    setTrips(tripsFromServer);
  };

  useEffect(() => {
    getTripsFromDatabase();
  }, []);

  const handleAddTripFormSubmit = async (trip: Omit<Trip, 'id'>) => {
    try {
      await createTrip(trip);
      await getTripsFromDatabase();
      setShowAddTripForm(!showAddTripForm);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTripButtonClick = () => {
    setShowAddTripForm(!showAddTripForm);
  };
  return (
    <div className="trips">
      <h1 className="trips__header">Trips</h1>
      <div className="trips__content">
        <TripsTable trips={trips} />
        {showAddTripForm && (
          <AddTripForm onSubmit={handleAddTripFormSubmit} drivers={drivers} />
        )}
        <Button onClick={handleAddTripButtonClick} variant="primary">
          {showAddTripForm ? 'Back' : 'Add trip'}
        </Button>
      </div>
    </div>
  );
};
