import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';

const app = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter()

    const handleLogin = async () => {
    
        const response = await fetch('http://10.0.2.2:3000/createusers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: user,
                email: email,
                password: password
            }),
            mode: 'cors'
        });

        if (response.ok) {
            router.push("/dash")
        } else {
            console.error(response)
            return await response.text();
        }
    };
    return(
        <View style={styles.container}>
            <Text style={styles.Title}>Criar usuario</Text>
            <View style={styles.Form}>
                <TextInput
                    style={styles.inputs}
                    placeholder="username"
                    value={user}
                    onChangeText={text => setUser(text)}
                    secureTextEntry
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="Senha"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
            </View>
            <Pressable style={styles.enter} onPress={() => handleLogin()}>
                <Text style={styles.enterText}>Entrar</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050505',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingBottom: 50,
        paddingTop: 50,
    },
    Title: {
        color: "#eee",
        fontSize: 28,
        letterSpacing: 1,
    },
    Form: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%"
    },
    inputs: {
        borderWidth: 1,
        backgroundColor: "#575757e6",
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 16,
        color: "#eee",
        marginBottom: 20,
        width: "80%",
        height: 62,
    },
    enter: {
        backgroundColor: "#1b71d3",
        width: "75%",
        height: "7%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    enterText: {
        color: "#eee",
        fontSize: 18,
        letterSpacing: 1,
    }
})

export default app;