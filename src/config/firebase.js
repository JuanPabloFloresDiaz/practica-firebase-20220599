import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, TEST } from '@env';

console.log(TEST);
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} else {
  app = getApp();
  console.log('Firebase already initialized');
}

const database = getFirestore(app);
if (database) {
  console.log('Firestore initialized correctly');
} else {
  console.log('Firestore initialization failed');
}

const storage = getStorage(app);
if (storage) {
  console.log('storage initialized correctly');
} else {
  console.log('storage initialization failed');
}

let auth;
try {
  auth = getAuth(app);
  console.log('auth already initialized');
} catch (e) {
  if (e.code === 'auth/already-initialized') {
    auth = getAuth(app);
    console.log('using existing auth instance');
  } else {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
    console.log('auth initialized with persistence');
  }
}

if (auth) {
  console.log('auth initialized correctly');
} else {
  console.log('auth initialization failed');
}

export { database, storage, auth };
