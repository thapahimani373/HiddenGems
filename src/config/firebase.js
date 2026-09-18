import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAuukzyF5rxRLp5eHp00B4mnFcQEudLP90',
  authDomain: 'hiddengems-50df6.firebaseapp.com',
  projectId: 'hiddengems-50df6',
  storageBucket: 'hiddengems-50df6.firebasestorage.app',
  messagingSenderId: '1020856499416',
  appId: '1:1020856499416:web:1248b39d49964a6f01ebad',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
