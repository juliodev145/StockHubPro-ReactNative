import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import InputBox from "../components/InputBox";
import { useState } from "react";
import Button from "../components/Button";

const BLUE = "#0045C4"

export default function ResetPass({navigation}){

    //declaracao de uma variavel de estado
    const [code, setCode] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

     function handleReset() {
        // Depois: validar e enviar para a API
        console.log("Código:", code, "Senhas iguais?", senha === confirmarSenha);
    }

    //Dentro do return (no meio das tags) → {/* comentário */}
    //Fora do return (no JavaScript normal) → // comentário ou /* comentário */

    return(
        <ScreenContainer header={<Header subtitle="A gestão do seu estoque"/>}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#000"/>
                </TouchableOpacity>

                <Text style={styles.title}>Redefinição de Senha</Text>
                <Text style={styles.subtitle}>Acabamos de enviar um código para seu e-mail.</Text>
                <Text style={styles.subtitle2}>Caso não encontre o e-mail na sua caixa de entrada, verifique sua caixa de spam.</Text>

                <InputBox
                    placeholder="Insira o código"
                    keyboardType="numeric"
                    value={code}
                    onChangeText={setCode}
                />

                <InputBox //inputBox ja tem o icone do olho
                    placeholder="Insira a nova senha"
                    isPassword
                    value={senha}
                    onChangeText={setSenha}
                />  

                <InputBox
                    placeholder="Repita sua nova senha"
                    isPassword
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                />
                <View style={styles.buttonArea}>
                    <Button title="Redefinir"/>
                    <Button title="Fazer login" variant="outline" onPress={() => navigation.navigate("Login")}/>
                </View>

            </ScrollView>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize:17,
        color: BLUE,
        fontWeight:"600",
        marginTop:16,
        marginBottom:12,
        textAlign: 'center',
    },
    subtitle:{
        fontSize:14, 
        color: "#333",
        marginTop:20,
        marginBottom:28,
        textAlign:'center',
    },
    subtitle2:{
        fontSize:14, 
        color: "#000",
        marginBottom:28,
        textAlign:'center',
        fontWeight: "600",       
    },
    back:{
        marginTop:16,
        marginBottom:8,
        alignSelf:'flex-start',
    },
    buttonArea:{
        marginTop:24,
        alignItems:'center',
    },

})