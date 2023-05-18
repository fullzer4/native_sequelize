import { useRouter } from "expo-router"
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, FlatList, Image, TextInput } from "react-native"

const app = () => {

    const [editName, setEditName] = useState("")
    const [users, setUsers] = useState([]);
    const [editState, setEditState] = useState(false)
    const [id, setId] = useState("")

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
            name: editName, 
          }),
        })
          .then(response => response.json())
          .then(data => {
            const updatedUser = { ...data, name: editName };
            setUsers(users.map(user => user.id === userId ? updatedUser : user));
            setEditName('');
            changeEdit("");
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

    const router = useRouter()

    const renderUser = ({ item }) => (
        <View style={styles.user}>
            <View>
                <Text>Usuario: {item.name}</Text>
                <Text>Email: {item.email}</Text>
            </View>
            <View>
                <Pressable onPress={() => changeEdit(item.id)}>
                    <Image style={styles.edit} source={require(
                        '../assets/pencil.png',
                    )}></Image>
                </Pressable>
                <Pressable onPress={() => handleDeleteUser(item.id)}>
                    <Image style={styles.trash} source={require(
                        '../assets/trash.png',
                    )}></Image>
                </Pressable>
            </View>
        </View>
    );

    const editBox = () => {
        return(
            <View style={[styles.editBack, editState ? { display: 'flex' } : { display: 'none' }]}>
                <View style={styles.editbox}>
                    <Text style={styles.editText}>EditBox</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Username"
                        value={editName}
                        onChangeText={text => setEditName(text)}
                    />
                    <View style={styles.buttonsEdit}>
                        <Pressable onPress={() => handleEditName(id)} style={styles.buttons}>
                            <Text style={styles.textb}>Editar</Text>
                        </Pressable>
                        <Pressable onPress={() => changeEdit("")} style={styles.buttons}>
                            <Text style={styles.textb}>Voltar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        )
    }

    const changeEdit = (id) => {
        if(editState === false){
            setEditState(true)
            setId(id)
        }else{
            setEditState(false)
            setId("")
        }
    }

    return(
        <View style={styles.container}>
            {editBox()}
            <Text style={styles.title}>Lista</Text>
            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
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
        width: "100%"
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
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    user: {
        display:"flex",
        flexDirection: "row",
        backgroundColor: '#eee',
        padding: 10,
        marginVertical: 5,
        width: '90%',
        borderRadius: 5,
        alignItems: 'flex-start',
        aspectRatio: 5,
        justifyContent: "space-between"
    },
    trash: {
        height: 25,
        width: 25,
        backgroundColor: '#e7131357',
        borderRadius: 5
    },
    edit: {
        height: 20,
        width: 20,
    },
    inputs: {
        backgroundColor: '#b6c2ce',
        justifyContent: "center",
        borderRadius: 5,
        alignItems: 'center',
        width: "80%",
        aspectRatio: 4,
        paddingLeft: 10
    },
    editbox:{
        backgroundColor: '#fff',
        borderRadius: 5,
        width: "80%",
        aspectRatio: 1,
        elevation: 5,
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40
    },
    buttonsEdit:{
        width: "80%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttons: {
        backgroundColor: "#1b71d3",
        width: "45%",
        height: "50%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    editBack: {
        position: "absolute",
        width: "100%",
        height: "110%",
        backgroundColor: "#000000c3",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    editText: {
        color: "#000000",
        fontSize: 22,
        letterSpacing: 1
    },
    textb: {
        color: "#ffffff",
        fontSize: 18,
        letterSpacing: 1
    }
})

export default app