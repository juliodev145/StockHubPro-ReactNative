import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BarcodeScanner from "../components/BarcodeScanner";

const BLUE = "#0045C4";

const INITIAL_FORM = {
    codigo: "",
    quantidade: "",
};

export default function RemoveItem({ navigation }) {
    const [form, setForm] = useState(INITIAL_FORM);
    const [scannerVisible, setScannerVisible] = useState(false);

    function updateField(campo, valor) {
        setForm((prev) => ({ ...prev, [campo]: valor }));
    }

    function handleClear() {
        setForm(INITIAL_FORM);
    }

    function handleScanned(codigo) {
        updateField("codigo", codigo);
        setScannerVisible(false);
    }

    function handleRegister() {
        // Depois: enviar a saída para a API
        console.log("Saída:", form);
    }

    return (
        <ScreenContainer header={<Header subtitle="A gestão do seu estoque" />}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.navigate("Home")}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Saída de item</Text>

                <View style={styles.card}>
                    <View style={styles.codeRow}>
                        <View style={styles.codeInput}>
                            <InputBox placeholder="Código do produto" value={form.codigo}
                                onChangeText={(v) => updateField("codigo", v)} />
                        </View>
                        <TouchableOpacity style={styles.scanButton} onPress={() => setScannerVisible(true)}>
                            <Ionicons name="barcode-outline" size={28} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <InputBox placeholder="Quantidade" keyboardType="numeric" value={form.quantidade}
                        onChangeText={(v) => updateField("quantidade", v)} />

                    <View style={styles.buttonRow}>
                        <Button title="Limpar" variant="danger" onPress={handleClear} style={styles.rowButton} />
                        <Button title="Registrar" onPress={handleRegister} style={styles.rowButton} />
                    </View>
                </View>
            </ScrollView>

            <BarcodeScanner
                visible={scannerVisible}
                onClose={() => setScannerVisible(false)}
                onScanned={handleScanned}
            />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    back: { marginTop: 16, marginBottom: 8, alignSelf: "flex-start" },
    title: {
        fontSize: 17, color: BLUE, fontWeight: "600",
        textAlign: "center", marginBottom: 20,
    },
    card: {
        borderWidth: 1, borderColor: BLUE, borderRadius: 10,
        padding: 16, marginBottom: 24,
    },
    codeRow: { flexDirection: "row", alignItems: "flex-end", gap: 10 },
    codeInput: { flex: 1 },
    scanButton: {
        borderWidth: 1, borderColor: "#000", borderRadius: 10,
        paddingHorizontal: 10, paddingVertical: 6,
    },
    buttonRow: { flexDirection: "row", gap: 16, marginTop: 24 },
    rowButton: { flex: 1, width: "auto", marginBottom: 0 },
});