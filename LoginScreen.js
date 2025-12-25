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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function LoginScreen({ onLoginSuccess, onNavigateToRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onLoginSuccess();
        } catch (error) {
            let errorMessage = 'Une erreur est survenue';
            if (error.code === 'auth/invalid-email') {
                errorMessage = 'Email invalide';
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'Utilisateur non trouvé';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Mot de passe incorrect';
            } else if (error.code === 'auth/invalid-credential') {
                errorMessage = 'Identifiants invalides';
            }
            Alert.alert('Erreur de connexion', errorMessage);
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
                    <Text style={styles.welcomeText}>Bienvenue ! 👋</Text>
                    <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>
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

                    <TouchableOpacity
                        style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.loginButtonText}>Se connecter</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Vous n'avez pas de compte ?</Text>
                    <TouchableOpacity onPress={onNavigateToRegister} disabled={loading}>
                        <Text style={styles.registerLink}>Créer un compte</Text>
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
    loginButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginTop: 12,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    loginButtonDisabled: {
        backgroundColor: '#2a5a2c',
    },
    loginButtonText: {
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
    registerLink: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
