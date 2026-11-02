import { View, Text, StyleSheet } from "react-native";

const BLUE = "#0045C4";

export default function StatCard({ title, value, style }) {
    return (
        <View style={[styles.card, style]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: BLUE,
        borderRadius: 10,
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 90,
        backgroundColor: "#fff",
    },
    title: { fontSize: 15, color: "#000" },
    value: { fontSize: 22, fontWeight: "600", color: BLUE, marginTop: 12 },
});    