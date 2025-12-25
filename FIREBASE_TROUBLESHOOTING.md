# 🔧 Guide de Configuration Firebase - Résolution Erreur d'Inscription

## ⚠️ Problème Actuel

Vous recevez une erreur générique "Une erreur est survenue" lors de l'inscription. Cela peut venir de plusieurs sources.

---

## 🔍 Diagnostic en Temps Réel

J'ai amélioré le code pour afficher les détails exacts de l'erreur. Maintenant :

### Étape 1 : Testez à nouveau l'inscription
1. Rechargez l'application Expo (secouez votre téléphone et appuyez sur "Reload")
2. Essayez de vous inscrire avec un nouveau compte
3. **Regardez les logs dans le terminal** où vous avez lancé `npm start`
4. Vous devriez voir des lignes comme :
   ```
   Erreur Firebase complète: [Object]
   Code erreur: auth/operation-not-allowed
   Message erreur: ...
   ```

### Étape 2 : Vérifiez le code d'erreur

Selon le code d'erreur affiché, voici les solutions :

---

## 🔥 Problème #1 : `auth/operation-not-allowed`

**Cause :** L'authentification Email/Password n'est PAS activée dans Firebase

**Solution :** Activez l'authentification dans Firebase Console

### Instructions détaillées :

1. **Allez sur [Firebase Console](https://console.firebase.google.com/)**
2. **Sélectionnez votre projet** : `monappfirebase-edc05`
3. Dans le menu de gauche, cliquez sur **"Authentication"** (🔐 icône de cadenas)
4. Cliquez sur l'onglet **"Sign-in method"** (Méthode de connexion)
5. Dans la liste des fournisseurs, trouvez **"Email/Password"**
6. Cliquez dessus pour l'éditer
7. **Activez le bouton "Enable"** (premier toggle)
8. Cliquez sur **"Save"** (Enregistrer)

> [!IMPORTANT]
> Il y a DEUX toggles dans Email/Password :
> - **Premier toggle** : "Email/Password" → **DOIT ÊTRE ACTIVÉ** ✅
> - **Deuxième toggle** : "Email link (passwordless sign-in)" → Peut rester désactivé

---

## 🔥 Problème #2 : `auth/network-request-failed`

**Cause :** Problème de connexion réseau

**Solution :**
- Vérifiez votre connexion Internet
- Assurez-vous que votre téléphone et PC sont sur le même réseau WiFi
- Réessayez dans quelques secondes

---

## 🔥 Problème #3 : `auth/invalid-api-key`

**Cause :** Clé API Firebase incorrecte

**Solution :**
1. Retournez sur [Firebase Console](https://console.firebase.google.com/)
2. Projet → ⚙️ Paramètres → Paramètres du projet
3. Scrollez vers le bas jusqu'à "Vos applications"
4. Copiez la configuration Firebase
5. Vérifiez que les valeurs dans `firebaseConfig.js` correspondent EXACTEMENT

---

## 🔥 Problème #4 : `auth/invalid-email`

**Cause :** Format d'email invalide

**Solution :**
- Utilisez un format email valide : `exemple@domaine.com`
- Vérifiez qu'il n'y a pas d'espaces avant/après

---

## 🔥 Problème #5 : `auth/weak-password`

**Cause :** Mot de passe trop court (< 6 caractères)

**Solution :**
- Utilisez au moins 6 caractères pour le mot de passe

---

## 📱 Test Complet

Après avoir vérifié/corrigé la configuration Firebase :

1. **Relancez l'app** (Reload dans Expo)
2. **Testez avec ces identifiants** :
   - Email : `test@example.com`
   - Mot de passe : `test123456` (min. 6 caractères)
3. **Vérifiez la console** pour voir les logs d'erreur détaillés
4. **Envoyez-moi le code d'erreur** si le problème persiste

---

## ✅ Checklist de Vérification

- [ ] Firebase Console → Authentication est accessible
- [ ] Sign-in method → Email/Password est **activé** (toggle vert)
- [ ] Les identifiants dans `firebaseConfig.js` sont corrects
- [ ] Le téléphone et PC sont sur le même réseau
- [ ] L'email utilisé est au bon format
- [ ] Le mot de passe fait au moins 6 caractères
- [ ] Les logs de la console ont été vérifiés

---

## 🆘 Si Le Problème Persiste

Faites ceci et envoyez-moi les informations :

1. **Copiez les logs d'erreur** du terminal (Code erreur + Message)
2. **Prenez une capture d'écran** de Firebase Console → Authentication → Sign-in method
3. **Confirmez** que vous avez bien activé Email/Password dans Firebase

Je pourrai alors vous aider plus précisément !
