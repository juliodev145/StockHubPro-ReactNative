import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

const BLUE = "#0045C4";

export default function Login({navigation}) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function handleLogin() {
        // Depois: enviar para a API (JWT)
        console.log("Login:", email);
        navigation.reset({index: 0, routes: [{name: "App"}]}); //limpa a pilha e vai para a tela de abas
    }

    return (
        <ScreenContainer style={styles.container}>
            <Text style={styles.title}>
                Bem-vindo ao <Text style={styles.brand}>StockHub Pro</Text>
            </Text>
            <Text style={styles.subtitle}>Entre para fazer a gestão do seu estoque.</Text>

            <InputBox
                placeholder="E-mail"
                icon="person-outline"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <InputBox
                placeholder="Senha"
                icon="lock-closed-outline"
                isPassword
                value={senha}
                onChangeText={setSenha}
            />

            <TouchableOpacity onPress={() => navigation.navigate("ForgotPass")}>
                <Text style={[styles.link, styles.forgot]}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <Button title="Entrar" onPress={handleLogin} />
            <Button title="Criar conta" variant="outline" onPress={() => navigation.navigate("Register")}/>

            <TouchableOpacity style={styles.footer} onPress={() => navigation.navigate("AboutUs")}>
                <Text style={styles.link}>Quem somos - Suporte</Text>
            </TouchableOpacity>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: "center", justifyContent: "center" },
    title: { fontSize: 22, color: "#000", textAlign: "center" },
    brand: { color: BLUE, fontWeight: "bold" },
    subtitle: {
        fontSize: 13, color: "#333", textAlign: "center",
        marginTop: 20, marginBottom: 18,
    },
    link: { color: BLUE, textDecorationLine: "underline", fontSize: 12 },
    forgot: { marginTop: 14, marginBottom: 28 },
    footer: { marginTop: 28 },
});