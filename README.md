# 📱 MonAppFirebase - To-Do List avec Firebase

Application React Native de gestion de tâches avec authentification Firebase et Firestore.

## 🎯 Fonctionnalités

- ✅ **Authentification** : Inscription et connexion avec email/mot de passe
- ✅ **Gestion de tâches** : Ajout, lecture et suppression via Firestore
- ✅ **UI moderne** : Design sombre avec effets glassmorphism
- ✅ **Architecture modulaire** : Écrans séparés (Login, Register, Tasks)

## 🚀 Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez **Authentication** → Méthode "Email/Password"
4. Créez une **Firestore Database** (mode Test)
5. Dans les paramètres du projet, copiez vos identifiants de configuration
6. Ouvrez `firebaseConfig.js` et remplacez les placeholders :

```javascript
const firebaseConfig = {
    apiKey: "VOTRE_CLE_API",              // Remplacer TA_CLE_API
    authDomain: "VOTRE_AUTH_DOMAIN",      // Remplacer TON_AUTH_DOMAIN
    projectId: "VOTRE_PROJECT_ID",        // Remplacer TON_PROJECT_ID
    storageBucket: "VOTRE_STORAGE",       // Remplacer TON_STORAGE_BUCKET
    messagingSenderId: "VOTRE_SENDER_ID", // Remplacer TON_MESSAGING_SENDER_ID
    appId: "VOTRE_APP_ID"                 // Remplacer TON_APP_ID
};
```

### 3. Lancer l'application

```bash
npm start
```

Scannez le QR code avec **Expo Go** sur votre téléphone.

## 📂 Structure du Projet

```
MonAppFirebase/
├── App.js              # Navigation et gestion d'état
├── firebaseConfig.js   # Configuration Firebase
├── LoginScreen.js      # Écran de connexion
├── RegisterScreen.js   # Écran d'inscription
└── TasksScreen.js      # Écran de gestion des tâches
```

## 🎨 Technologies

- **React Native** avec **Expo SDK 54**
- **Firebase Authentication** pour l'authentification
- **Cloud Firestore** pour la base de données
- **React Hooks** pour la gestion d'état

## 📝 Utilisation

1. **Inscription** : Créez un compte avec email et mot de passe (min. 6 caractères)
2. **Connexion** : Connectez-vous avec vos identifiants
3. **Ajouter une tâche** : Tapez votre tâche et cliquez sur "Ajouter"
4. **Supprimer une tâche** : Cliquez sur l'icône 🗑️
5. **Actualiser** : Tirez vers le bas pour rafraîchir la liste
6. **Déconnexion** : Cliquez sur "Déconnexion" dans le header

## 🔥 Services Firebase Utilisés

- `createUserWithEmailAndPassword` - Inscription
- `signInWithEmailAndPassword` - Connexion
- `signOut` - Déconnexion
- `onAuthStateChanged` - Surveillance de l'état d'authentification
- `addDoc` - Ajout de tâches
- `getDocs` - Lecture des tâches
- `deleteDoc` - Suppression de tâches

## 📚 Documentation

Consultez [walkthrough.md](C:\Users\Othmane\.gemini\antigravity\brain\ffa04db7-4913-4b8e-825d-924be73666a0\walkthrough.md) pour une documentation complète avec captures d'écran et détails techniques.

---

**Développé pour le TP Mobile - 4IIR** 🎓
