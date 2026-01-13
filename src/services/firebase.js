import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Firebase-Konfiguration
// TODO: Ersetze diese Werte mit deinen eigenen Firebase-Credentials
// Du kannst ein kostenloses Firebase-Projekt unter https://console.firebase.google.com erstellen
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialisiere Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

