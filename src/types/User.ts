import { Roles } from './Roles';

export interface User {
  id: string;
  authId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  carNumber: string | null;
  currentLocation: string;
  destination: string;
  role: Roles;
}
