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
import { Trip } from '../types/Trip';

const tripFirestore = getFirestore(app);

export const createTrip = async (trip: Omit<Trip, 'id'>) => {
  const tripsCollection = collection(tripFirestore, 'trips');
  const docRef = await addDoc(tripsCollection, trip);
  console.log('Trip added with ID:', docRef.id);
};

export const getTripById = async (tripId: string) => {
  const TripDocRef = doc(tripFirestore, 'trips', tripId);
  const docSnapshot = await getDoc(TripDocRef);
  if (docSnapshot.exists()) {
    return { id: docSnapshot.id, ...docSnapshot.data() };
  } else {
    console.log('Trip not found');
    return null;
  }
};

export const getTripByAuthId = async (authId: string): Promise<Trip | null> => {
  const tripsCollection = collection(tripFirestore, 'trips');
  const q = query(tripsCollection, where('authId', '==', authId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const TripDoc = querySnapshot.docs[0];
    const TripData = TripDoc.data();

    const trip: Trip = {
      id: TripDoc.id,
      date: TripData.date,
      from: TripData.from,
      to: TripData.to,
      driverName: TripData.driverName,
      driverPhone: TripData.driverPhone,
      carNumber: TripData.carNumber,
    };

    console.log('Trip found:', trip);
    return trip;
  } else {
    console.log('No Trip found with the specified phone number');
    return null;
  }
};

export const getAllTrips = async () => {
  const tripsCollection = collection(tripFirestore, 'trips');
  const querySnapshot = await getDocs(tripsCollection);
  const trips: Trip[] = querySnapshot.docs.map(TripDoc => ({
    id: TripDoc.id,
    date: TripDoc.data().date,
    from: TripDoc.data().from,
    to: TripDoc.data().to,
    driverName: TripDoc.data().driverName,
    driverPhone: TripDoc.data().driverPhone,
    carNumber: TripDoc.data().carNumber,
  }));
  return trips;
};

export const updateTrip = async (
  TripId: string,
  updatedData: Partial<Trip>
) => {
  const TripDocRef = doc(tripFirestore, 'trips', TripId);
  await updateDoc(TripDocRef, updatedData);
  console.log('Trip updated');
};

export const deleteTrip = async (TripId: string) => {
  const TripDocRef = doc(tripFirestore, 'trips', TripId);
  await deleteDoc(TripDocRef);
  console.log('Trip deleted');
};
