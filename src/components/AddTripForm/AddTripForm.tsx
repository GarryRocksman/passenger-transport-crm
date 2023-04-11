import './AddTripForm.scss';

import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { Trip } from '../../types/Trip';
import { User } from '../../types/User';

type AddTripFormProps = {
  onSubmit: (trip: Omit<Trip, 'id'>) => void;
  drivers: User[];
};
export const AddTripForm: React.FC<AddTripFormProps> = ({
  onSubmit,
  drivers,
}) => {
  const [date, setDate] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const [selectedDriverId, setSelectedDriverId] = useState('');
  const selectedDriver = drivers.find(driver => driver.id === selectedDriverId);

  const [driverPhone, setDriverPhone] = useState('');
  const [carNumber, setCarNumber] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !selectedDriver ||
      !date ||
      !from ||
      !to ||
      !driverPhone ||
      !carNumber
    ) {
      return;
    }
    const trip: Omit<Trip, 'id'> = {
      date,
      from,
      to,
      driverName: selectedDriver.firstName,
      driverPhone,
      carNumber,
    };

    onSubmit(trip);
  };

  useEffect(() => {
    if (selectedDriver) {
      setDriverPhone(selectedDriver.phone);
      setCarNumber(selectedDriver.carNumber || '');
    } else {
      setDriverPhone('');
      setCarNumber('');
    }
  }, [selectedDriverId]);

  console.log(selectedDriver);

  return (
    <Form className="trips-from" action="/" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="date">
        <Form.Label>Data</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={date}
          onChange={event => {
            setDate(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="from">
        <Form.Label htmlFor="from">From</Form.Label>
        <Form.Control
          type="text"
          name="from"
          value={from}
          onChange={event => {
            setFrom(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="to">
        <Form.Label htmlFor="to">To</Form.Label>
        <Form.Control
          type="text"
          name="to"
          value={to}
          onChange={event => {
            setTo(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="driverName">
        <Form.Label htmlFor="driverName">Driver name</Form.Label>
        <Form.Select
          name="driverName"
          value={selectedDriverId}
          defaultValue="selectDriver"
          onChange={event => {
            setSelectedDriverId(event.target.value);
          }}
        >
          <option value="selectDriver">Select driver</option>
          {drivers.map(driver => (
            <option key={driver.id} value={driver.id}>
              {driver.firstName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="driverPhone">
        <Form.Label htmlFor="driverPhone">Driver phone</Form.Label>
        <Form.Control
          type="text"
          id="driverPhone"
          name="driverPhone"
          value={driverPhone}
          onChange={event => {
            setDriverPhone(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="carNumber">
        <Form.Label htmlFor="carNumber">Car number</Form.Label>
        <Form.Control
          type="text"
          id="carNumber"
          name="carNumber"
          value={carNumber}
          onChange={event => {
            setCarNumber(event.target.value);
          }}
        />
      </Form.Group>
      <Button variant="secondary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
