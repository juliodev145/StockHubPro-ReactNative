import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import Button from "../components/Button";
import { MOCK_COMPANY, MOCK_USER } from "../constants/mockData";

const BLUE = "#0045C4";

function getInitials(nome) {
    return nome
        .split(" ")
        .map((parte) => parte[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

function InfoBox({ label, value }) {
    return (
        <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

export default function Profile({ navigation }) {
    const user = MOCK_USER;
    const company = MOCK_COMPANY;
    const endereco =
        `${company.logradouro}, ${company.numero} — ${company.bairro}, ` +
        `${company.cidade} - ${company.estado}, CEP ${company.cep}`;

    function handleLogout() {
        Alert.alert("Sair", "Deseja sair da sua conta?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Sair",
                style: "destructive",
                onPress: () => navigation.reset({ index: 0, routes: [{ name: "Login" }] }),
            },
        ]);
    }

    return (
        <ScreenContainer header={<Header subtitle="A gestão do seu estoque" />}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Meu Perfil</Text>

                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{getInitials(user.nome)}</Text>
                </View>

                <InfoBox label="Nome da empresa" value={company.nome} />
                <InfoBox label="Nome" value={user.nome} />
                <InfoBox label="E-mail" value={user.email} />
                <InfoBox label="CNPJ" value={company.cnpj} />
                <InfoBox label="Endereço" value={endereco} />

                <View style={styles.buttonArea}>
                    <Button title="Alterar senha" variant="outline" icon="lock"
                        onPress={() => navigation.navigate("ForgotPass")} />
                    <Button title="Sair" variant="danger" icon="log-out" onPress={handleLogout} />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    back: { marginTop: 16, marginBottom: 8, alignSelf: "flex-start" },
    title: {
        fontSize: 17, color: BLUE, fontWeight: "600",
        textAlign: "center", marginBottom: 20,
    },
    avatar: {
        width: 80, height: 80, borderRadius: 40, backgroundColor: BLUE,
        alignItems: "center", justifyContent: "center",
        alignSelf: "center", marginBottom: 24,
    },
    avatarText: { color: "#fff", fontSize: 28, fontWeight: "bold" },
    infoBox: {
        borderWidth: 1, borderColor: BLUE, borderRadius: 10,
        paddingHorizontal: 15, paddingVertical: 10, marginBottom: 12,
    },
    infoLabel: { fontSize: 12, color: "#858585", marginBottom: 2 },
    infoValue: { fontSize: 16, color: "#000" },
    buttonArea: { alignItems: "center", marginTop: 24, marginBottom: 24 },
});