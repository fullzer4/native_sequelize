import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View, Text, TextInput } from "react-native"

const app = () => {

    const [name, setName] = useState("")
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://10.0.2.2:3000/users')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setUsers(data);
        })
        .catch(error => {
            console.error('Erro ao buscar usuários:', error);
        });
    }, []);

    const handleEditName = (userId) => {
        fetch(`http://10.0.2.2:3000/edituser/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
          }),
        })
          .then(response => response.json())
          .then(data => {
            setUsers(users.map(user => user.id === userId ? data : user));
            setName('');
          })
          .catch(error => {
            console.error('Erro ao editar nome do usuário:', error);
          });
      };

      const handleDeleteUser = (userId) => {
        fetch('http://10.0.2.2:3000/deleteuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: userId,
          }),
        })
          .then(response => response.json())
          .then(data => {
            setUsers(users.filter(user => user.id !== userId));
          })
          .catch(error => {
            console.error('Erro ao excluir usuário:', error);
          });
      };
    

    return(
        <View style={styles.container}>
            <View style={styles.editcontainer}>
                <TextInput
                    style={styles.inputs}
                    placeholder="EditarMeuNome"
                    value={name}
                    onChangeText={text => setName(text)}
                    secureTextEntry
                />
                <Pressable onPress={() => handleEditName(6)} style={styles.editname}>
                    <Text>Mudar</Text>
                </Pressable>
            </View>
            <View style={styles.containerNames}>
                {users.map(user => (
                    <View style={styles.containerE} key={user.id}><Text style={styles.text}>{user.name}</Text><Text style={styles.text}>{user.email}</Text></View>
                ))}
            </View>
            <View style={styles.deletecontainer}>
                <Pressable onPress={() => handleDeleteUser(3)} style={styles.deletebox}>
                    <Text>Deletar meu usuario</Text>
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
        paddingBottom: 50,
        paddingTop: 50,
    },
    containerNames:{
        width: "100%",
        height: "80%",
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    containerE: {
        width: "100%",
        height: "10%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#1c86b883"
    },
    text: {
        color: "#eee",
        fontSize: 12,
        letterSpacing: 1,
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
        width: "60%",
        height: 62,
    },
    editname: {
        width: "25%",
        height: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#1c86b883"
    },
    editcontainer: {
        display: "flex",
        flexDirection: "row",
    },
    deletecontainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
    },
    deletebox: {
        width: "25%",
        height: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#1c86b883"
    }
})

export default app