import { StyleSheet, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import Button from "../components/Button";

export default function Menu({ navigation }) {
    return (
        <ScreenContainer header={<Header subtitle="A gestão do seu estoque" />}>
            <View style={styles.area}>
                <Button title="Meu perfil" icon="user" onPress={() => navigation.navigate("Profile")} />
                <Button title="Relatórios" icon="file-text" onPress={() => navigation.navigate("Report")} />
                <Button title="Estoque" icon="package" onPress={() => navigation.navigate("Stock")} />
                <Button title="Cadastrar item" icon="plus-circle" onPress={() => navigation.navigate("AddItem")} />
                <Button title="Saída de item" icon="minus-circle" onPress={() => navigation.navigate("RemoveItem")} />
                <Button title="Início" icon="home" onPress={() => navigation.navigate("Home")} />
                <Button title="Sair" icon="log-out" variant="danger" onPress={() => navigation.navigate("Login")} />
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    area: { alignItems: "center", marginTop: 32 },
});