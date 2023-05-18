import { useRouter } from "expo-router"
import { StyleSheet, View, Text, Pressable } from "react-native"

const app = () => {

    const router = useRouter()

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Bem vindo</Text>
            <View style={styles.contentC}>
                <Text style={styles.content}>Este projeto e um crud bem simples com backend em express com sequelize e utilizando banco de dados postgres espero que gostem fiquem a vontade para navegar na aplicacao.</Text>
            </View>
            <View style={styles.linkC}>
                <Pressable style={styles.link} onPress={() => router.push("/create")}>
                    <Text style={styles.linkText}>Criar Usuario</Text>
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
    content: {
        color: "#eee",
        fontSize: 22,
        letterSpacing: 1,
        textAlign: "justify"
    },
    contentC: {
        width: "80%",
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
    }
})

export default app