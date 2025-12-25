import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

export default function TasksScreen({ onLogout }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadTasks();
    }, []);

    // Charger toutes les tâches depuis Firestore
    const loadTasks = async () => {
        setRefreshing(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'tasks'));
            const tasksData = [];
            querySnapshot.forEach((doc) => {
                tasksData.push({ id: doc.id, ...doc.data() });
            });
            setTasks(tasksData);
        } catch (error) {
            console.error('Error loading tasks:', error);
            Alert.alert('Erreur', 'Impossible de charger les tâches');
        } finally {
            setRefreshing(false);
        }
    };

    // Ajouter une nouvelle tâche
    const handleAddTask = async () => {
        if (!newTask.trim()) {
            Alert.alert('Attention', 'Veuillez entrer une tâche');
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, 'tasks'), {
                text: newTask.trim(),
                createdAt: new Date().toISOString(),
                userId: auth.currentUser?.uid,
            });
            setNewTask('');
            loadTasks();
        } catch (error) {
            console.error('Error adding task:', error);
            Alert.alert('Erreur', 'Impossible d\'ajouter la tâche');
        } finally {
            setLoading(false);
        }
    };

    // Supprimer une tâche
    const handleDeleteTask = (taskId) => {
        Alert.alert(
            'Confirmation',
            'Voulez-vous vraiment supprimer cette tâche ?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Supprimer',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteDoc(doc(db, 'tasks', taskId));
                            loadTasks();
                        } catch (error) {
                            console.error('Error deleting task:', error);
                            Alert.alert('Erreur', 'Impossible de supprimer la tâche');
                        }
                    },
                },
            ]
        );
    };

    // Déconnexion
    const handleLogout = async () => {
        Alert.alert(
            'Déconnexion',
            'Voulez-vous vraiment vous déconnecter ?',
            [
                { text: 'Annuler', style: 'cancel' },
                {
                    text: 'Déconnexion',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await signOut(auth);
                            onLogout();
                        } catch (error) {
                            Alert.alert('Erreur', 'Impossible de se déconnecter');
                        }
                    },
                },
            ]
        );
    };

    // Rendu d'une tâche
    const renderTask = ({ item }) => (
        <View style={styles.taskCard}>
            <View style={styles.taskContent}>
                <Text style={styles.taskText}>{item.text}</Text>
                <Text style={styles.taskDate}>
                    {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                </Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteTask(item.id)}
            >
                <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>✅ Mes Tâches</Text>
                    <Text style={styles.headerSubtitle}>
                        {auth.currentUser?.email}
                    </Text>
                </View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Déconnexion</Text>
                </TouchableOpacity>
            </View>

            {/* Liste des tâches */}
            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                refreshing={refreshing}
                onRefresh={loadTasks}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>📋 Aucune tâche pour le moment</Text>
                        <Text style={styles.emptySubtext}>Ajoutez votre première tâche ci-dessous</Text>
                    </View>
                }
            />

            {/* Input section */}
            <View style={styles.inputSection}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nouvelle tâche..."
                        placeholderTextColor="#888"
                        value={newTask}
                        onChangeText={setNewTask}
                        onSubmitEditing={handleAddTask}
                        editable={!loading}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.addButton, loading && styles.addButtonDisabled]}
                    onPress={handleAddTask}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text style={styles.addButtonText}>Ajouter</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f0f1e',
    },
    header: {
        backgroundColor: '#1a1a2e',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#a0a0a0',
    },
    logoutButton: {
        backgroundColor: '#ff4757',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 16,
        paddingBottom: 100,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 18,
        color: '#4CAF50',
        fontWeight: '600',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#888',
    },
    taskCard: {
        backgroundColor: '#1a1a2e',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    taskContent: {
        flex: 1,
        marginRight: 12,
    },
    taskText: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 6,
    },
    taskDate: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '600',
    },
    deleteButton: {
        padding: 8,
    },
    deleteButtonText: {
        fontSize: 20,
    },
    inputSection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1a1a2e',
        padding: 16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    inputContainer: {
        backgroundColor: '#0f0f1e',
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#2a2a3e',
    },
    input: {
        color: '#ffffff',
        fontSize: 16,
        padding: 16,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
    },
    addButtonDisabled: {
        backgroundColor: '#2a5a2c',
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
