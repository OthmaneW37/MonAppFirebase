import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import TasksScreen from './TasksScreen';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' | 'register' | 'tasks'

  useEffect(() => {
    // Écouter les changements d'état d'authentification
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Afficher un loader pendant la vérification de l'authentification
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  // Si l'utilisateur est connecté, afficher l'écran des tâches
  if (user) {
    return <TasksScreen onLogout={() => setUser(null)} />;
  }

  // Si l'utilisateur n'est pas connecté, afficher Login ou Register
  if (currentScreen === 'register') {
    return (
      <RegisterScreen
        onRegisterSuccess={() => setCurrentScreen('login')}
        onNavigateToLogin={() => setCurrentScreen('login')}
      />
    );
  }

  return (
    <LoginScreen
      onLoginSuccess={() => { }} // L'état sera mis à jour par onAuthStateChanged
      onNavigateToRegister={() => setCurrentScreen('register')}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f1e',
  },
});
