import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function RegisterScreen({ onRegisterSuccess, onNavigateToLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Succès', 'Compte créé avec succès !');
            onRegisterSuccess();
        } catch (error) {
            // Afficher l'erreur complète dans la console pour debug
            console.log('Erreur Firebase complète:', error);
            console.log('Code erreur:', error.code);
            console.log('Message erreur:', error.message);

            let errorMessage = 'Une erreur est survenue';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Cet email est déjà utilisé';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Email invalide';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Mot de passe trop faible';
            } else if (error.code === 'auth/operation-not-allowed') {
                errorMessage = '⚠️ ERREUR CONFIGURATION FIREBASE:\nL\'authentification par email/mot de passe n\'est pas activée dans votre console Firebase.\n\nAllez sur Firebase Console > Authentication > Sign-in method > Email/Password et activez-le.';
            } else {
                // Afficher le code d'erreur pour les erreurs inconnues
                errorMessage = `Une erreur est survenue\nCode: ${error.code}\nMessage: ${error.message}`;
            }
            Alert.alert('Erreur d\'inscription', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.welcomeText}>Créer un compte ✨</Text>
                    <Text style={styles.subtitle}>Rejoignez-nous dès maintenant</Text>
                </View>

                {/* Form */}
                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="votre@email.com"
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mot de passe</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#888"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Confirmer le mot de passe</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#888"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            editable={!loading}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.registerButton, loading && styles.registerButtonDisabled]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.registerButtonText}>Créer mon compte</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Vous avez déjà un compte ?</Text>
                    <TouchableOpacity onPress={onNavigateToLogin} disabled={loading}>
                        <Text style={styles.loginLink}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f1e',
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    headerContainer: {
        marginBottom: 48,
    },
    welcomeText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#a0a0a0',
    },
    formContainer: {
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#1a1a2e',
        borderWidth: 2,
        borderColor: '#2a2a3e',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#ffffff',
    },
    registerButton: {
        backgroundColor: '#2196F3',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginTop: 12,
        shadowColor: '#2196F3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    registerButtonDisabled: {
        backgroundColor: '#1a5a8a',
    },
    registerButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: '#a0a0a0',
        fontSize: 14,
        marginRight: 4,
    },
    loginLink: {
        color: '#2196F3',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
