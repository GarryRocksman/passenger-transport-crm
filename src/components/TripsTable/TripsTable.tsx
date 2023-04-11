import './TripsTable.scss';

import Table from 'react-bootstrap/Table';
import React from 'react';

import { Trip } from '../../types/Trip';

type TripsTableProps = {
  trips: Trip[];
};

export const TripsTable: React.FC<TripsTableProps> = ({ trips }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>From</th>
          <th>To</th>
          <th>Driver name</th>
          <th>Driver phone</th>
          <th>Car Number</th>
        </tr>
      </thead>
      <tbody>
        {trips.map((trip: Trip, index) => (
          <tr key={trip.id}>
            <td>{index + 1}</td>
            <td>{trip.date}</td>
            <td>{trip.from}</td>
            <td>{trip.to}</td>
            <td>{trip.driverName}</td>
            <td>{trip.driverPhone}</td>
            <td>{trip.carNumber}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
