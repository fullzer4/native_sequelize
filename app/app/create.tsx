import { useRouter } from "expo-router"
import { useState } from "react";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native"

const app = () => {

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            alert("Usuario criado")
        } else {
            console.error(response)
            return await response.text();
        }
    };

    const router = useRouter()

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Criar Usuario</Text>
            <View style={styles.inputsC}>
                <TextInput
                    style={styles.inputs}
                    placeholder="username"
                    value={user}
                    onChangeText={text => setUser(text)}
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
                <Pressable style={styles.inputConfirm} onPress={() => handleLogin()}>
                    <Text>Criar usuario</Text>
                </Pressable>
            </View>
            <View style={styles.linkC}>
                <Pressable style={styles.link} onPress={() => router.push("/")}>
                    <Text  style={styles.linkText}>Home</Text>
                </Pressable>
                <Pressable style={styles.link} onPress={() => router.push("/dash")}>
                    <Text style={styles.linkText}>Ir para lista</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050505',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingTop: 50,
    },
    title: {
        color: "#eee",
        fontSize: 28,
        letterSpacing: 10
    },
    linkC: {
        width: "80%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    link: {
        backgroundColor: "#1b71d3",
        width: "45%",
        height: "30%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    linkText: {
        color: "#eee",
        fontSize: 15,
        letterSpacing: 1
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
    inputsC: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between"
    },
    inputConfirm: {
        backgroundColor: "#1b71d3",
        width: "80%",
        height: "10%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default app