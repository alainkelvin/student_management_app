// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// 
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
// 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });



//        import React, { useEffect, useState } from 'react';
//        import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
//        import axios from 'axios';
//        
//        const App = () => {
//            const [students, setStudents] = useState([]);
//            const [name, setName] = useState('');
//            const [age, setAge] = useState('');
//            const [email, setEmail] = useState('');
//        
//            const fetchStudents = async () => {
//                try {
//                    const response = await axios.get('https://1b22-154-117-232-167.ngrok-free.app/students'); // Assurez-vous que l'API est accessible
//                    setStudents(response.data);
//                } catch (error) {
//                    console.error(error);
//                }
//            };
//        
//            const addStudent = async () => {
//                try {
//                    await axios.post('https://1b22-154-117-232-167.ngrok-free.app/students', { name, age, email });
//                    fetchStudents();
//                } catch (error) {
//                    console.error(error);
//                }
//            };
//        
//            useEffect(() => {
//                fetchStudents();
//            }, []);
//        
//            return (
//                <View style={styles.container}>
//                    <TextInput
//                        style={styles.input}
//                        placeholder="Nom"
//                        value={name}
//                        onChangeText={setName}
//                    />
//                    <TextInput
//                        style={styles.input}
//                        placeholder="Âge"
//                        value={age}
//                        onChangeText={setAge}
//                        keyboardType="numeric"
//                    />
//                    <TextInput
//                        style={styles.input}
//                        placeholder="Email"
//                        value={email}
//                        onChangeText={setEmail}
//                        keyboardType="email-address"
//                    />
//                    <Button title="Ajouter Étudiant" onPress={addStudent} />
//                    <FlatList
//                        data={students}
//                        keyExtractor={(item) => item.id.toString()}
//                        renderItem={({ item }) => (
//                            <Text style={styles.student}>{item.name} ({item.age}) - {item.email}</Text>
//                        )}
//                    />
//                </View>
//            );
//        };
//        
//        const styles = StyleSheet.create({
//            container: {
//                flex: 1,
//                padding: 20,
//            },
//            input: {
//                height: 40,
//                borderColor: 'gray',
//                borderWidth: 1,
//                marginBottom: 10,
//                paddingHorizontal: 8,
//            },
//            student: {
//                marginVertical: 5,
//            },
//        });
//        
//        export default App;
//        



import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';
import axios from 'axios';

const App = () => {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const fetchStudents = async () => {
        try {
            const response = await axios.get('https://49cd-154-117-232-167.ngrok-free.app'); // Remplacez par l'URL de votre API
            setStudents(response.data);
        } catch (error) {
            setError('Erreur lors de la récupération des étudiants. Vérifiez votre connexion et l\'API.');
            console.error(error);
        }
    };

    const addStudent = async () => {
        if (!name || !age || !email) {
            Alert.alert("Champs manquants", "Veuillez remplir tous les champs.");
            return;
        }
        try {
            await axios.post('https://49cd-154-117-232-167.ngrok-free.app', { name, age, email });
            fetchStudents();
            setName('');
            setAge('');
            setEmail('');
        } catch (error) {
            setError('Erreur lors de l’ajout de l’étudiant. Vérifiez votre connexion à l\'API.');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <View style={styles.container}>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Nom"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Âge"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Button title="Ajouter Étudiant" onPress={addStudent} />
            <FlatList
                data={students}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.student}>{item.name} ({item.age}) - {item.email}</Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    student: {
        marginVertical: 5,
    },
    error: {
        color: 'red',
        marginBottom: 15,
    },
});

export default App;