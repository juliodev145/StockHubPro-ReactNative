import { StyleSheet, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import Button from "../components/Button";

export default function Menu({ navigation }) {
    return (
        <ScreenContainer header={<Header subtitle="A gestão do seu estoque" />}>
            <View style={styles.area}>
                <Button title="Relatórios" icon="file-text" onPress={() => navigation.navigate("Report")} />
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    area: { alignItems: "center", marginTop: 32 },
});