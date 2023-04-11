import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  where,
  query,
} from 'firebase/firestore';

import { app } from '../firebase';
import { User } from '../types/User';

const userFirestore = getFirestore(app);

export const createUser = async (user: Omit<User, 'id'>) => {
  const usersCollection = collection(userFirestore, 'users');
  const docRef = await addDoc(usersCollection, user);
  console.log('User added with ID:', docRef.id);
};

export const getUserById = async (userId: string) => {
  const userDocRef = doc(userFirestore, 'users', userId);
  const docSnapshot = await getDoc(userDocRef);
  if (docSnapshot.exists()) {
    return { id: docSnapshot.id, ...docSnapshot.data() };
  } else {
    console.log('User not found');
    return null;
  }
};

export const getUserByAuthId = async (authId: string): Promise<User | null> => {
  const usersCollection = collection(userFirestore, 'users');
  const q = query(usersCollection, where('authId', '==', authId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    const user: User = {
      id: userDoc.id,
      authId: userData.authId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      email: userData.email,
      carNumber: userData.carNumber,
      currentLocation: userData.currentLocation,
      destination: userData.destination,
      role: userData.role,
    };

    console.log('User found:', user);
    return user;
  } else {
    console.log('No user found with the specified phone number');
    return null;
  }
};

export const getAllUsers = async () => {
  const usersCollection = collection(userFirestore, 'users');
  const querySnapshot = await getDocs(usersCollection);
  const users: User[] = querySnapshot.docs.map(userDoc => ({
    id: userDoc.id,
    authId: userDoc.data().authId,
    firstName: userDoc.data().firstName,
    lastName: userDoc.data().lastName,
    phone: userDoc.data().phone,
    email: userDoc.data().email,
    carNumber: userDoc.data().carNumber,
    currentLocation: userDoc.data().currentLocation,
    destination: userDoc.data().destination,
    role: userDoc.data().role,
  }));
  return users;
};

export const updateUser = async (
  userId: string,
  updatedData: Partial<User>
) => {
  const userDocRef = doc(userFirestore, 'users', userId);
  await updateDoc(userDocRef, updatedData);
  console.log('User updated');
};

export const deleteUser = async (userId: string) => {
  const userDocRef = doc(userFirestore, 'users', userId);
  await deleteDoc(userDocRef);
  console.log('User deleted');
};
