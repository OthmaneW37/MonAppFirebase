import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBPbMq6ib45Q2RtxFVdOlPz6g0g3hY6j8U",
    authDomain: "monappfirebase-edc05.firebaseapp.com",
    projectId: "monappfirebase-edc05",
    storageBucket: "monappfirebase-edc05.firebasestorage.app",
    messagingSenderId: "751064437706",
    appId: "1:751064437706:web:df9053d734987ba6f97533",
    measurementId: "G-YDHDEQ6JBW"
};

// Initialiser Firebase (éviter la duplication pendant le développement)
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

// Initialiser Auth avec AsyncStorage pour persister l'état d'authentification
let auth;
try {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
} catch (error) {
    // Si auth est déjà initialisé, récupérer l'instance existante
    auth = getAuth(app);
}

// Exporter les services Firebase
export { auth };
export const db = getFirestore(app);
