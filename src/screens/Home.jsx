import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import StatCard from "../components/StatCard";

const BLUE = "#0045C4";

export default function Home() {

    const user = "Julio";
    const test = {estoque: 235, entradas: 450, saidas: 215};

    return(
        <ScreenContainer header={<Header subtitle = "A gestão do seu estoque"/>}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Início</Text>
                <Text>Olá, {user}</Text>

                <StatCard title="Estoque" value={test.estoque} style={styles.mainCard}/>

                <View style={styles.row}>
                     <StatCard title="Entradas" value={test.entradas} style={styles.halfCard} />
                     <StatCard title="Saídas" value={test.saidas} style={styles.halfCard} />
                </View>

            </ScrollView>
     </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize: 17, color: BLUE, fontWeight: "600",
        textAlign: "center", marginTop: 20,
    },
    greeting: { fontSize: 16, color: "#000", marginTop: 20, marginBottom: 32 },
    mainCard: { width: "100%", minHeight: 110 },
    row: { flexDirection: "row", gap: 16, marginTop: 16 },
    halfCard: { flex: 1 },
});