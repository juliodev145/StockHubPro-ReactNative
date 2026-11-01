import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../components/Button";
import { ScreenContainer } from "react-native-screens";

{/**VER QUESTAO DO INPUTBOX E TEXTINPUT */}

const BLUE = "#0045C4";

export default function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <ScreenContainer style={styles.container}> 

            <Text style={styles.title}>
                Bem-vindo ao <Text style={styles.brand}>StockHub Pro</Text>
            </Text>

            <Text style={styles.subtitle}>
                Entre para fazer a gestão do seu estoque.
            </Text>

            <View style={styles.inputBox}> 
                <Feather name="user" size={20} color="#000"/>
                <TextInput
                    placeholder="E-mail"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputBox}>
                <Feather name="lock" size={20} color="#000"/>
                <TextInput style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    value={senha}
                    onChangeText={setSenha}       
                    secureTextEntry={!mostrarSenha}
                />
                <TouchableOpacity onPress={()=>setMostrarSenha(!mostrarSenha)}>
                    <Feather name={mostrarSenha ? 'eye' : 'eye-off'} size={22} color={"#000"}/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity>
                <Text style={styles.link}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <Button title="Entrar"/>
            <Button title="Criar conta" variant="outline"/>

            <TouchableOpacity style={styles.footer}>
                <Text style={styles.link}>Quem somos - Suporte</Text>
            </TouchableOpacity>

        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        marginTop:140,
    },
    title:{
        fontSize:22,
        color:"#000",
        textAlign:'center'
    },
    brand:{
        color:BLUE,
        fontWeight: "600",
    },
    subtitle:{
        fontSize:14, 
        color: "#333",
        marginTop:20,
        marginBottom:28,
        textAlign:'center',
    },
    inputBox:{
        width: '85%', 
        flexDirection: 'row', 
        alignItems: 'center',
        borderWidth: 2, 
        borderColor: BLUE, 
        borderRadius: 10,
        paddingHorizontal: 12, 
        height: 50, 
        marginBottom: 12,       
    },
    input:{flex:1, marginLeft:10, fontSize:14},
    link: {color:BLUE, textDecorationLine:'underline', fontSize:12, marginBottom:28},
    footer:{marginTop:28},
})