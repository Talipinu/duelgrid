import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase-Konfiguration für DuelGrid
const firebaseConfig = {
  apiKey: "AIzaSyAgDE9BXGg2J8dU8Wuc6WmWcXSv5mT88Fg",
  authDomain: "duelgrid-995b4.firebaseapp.com",
  databaseURL: "https://duelgrid-995b4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "duelgrid-995b4",
  storageBucket: "duelgrid-995b4.firebasestorage.app",
  messagingSenderId: "683811255253",
  appId: "1:683811255253:web:0083da6b78c3943853435c",
  measurementId: "G-B3RQYVSW7J"
};

// Initialisiere Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

