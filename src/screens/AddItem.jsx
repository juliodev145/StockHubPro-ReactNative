import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BarcodeScanner from "../components/BarcodeScanner";
import SelectBox from "../components/SelectBox";
import { CATEGORIES } from "../constants/categories";

const BLUE = "#0045C4";

const INITIAL_FORM = {
    nome: "",
    codigo: "",
    preco: "",
    quantidadeMinima: "",
    quantidade: "",
    categoria: "",
};

export default function AddItem({ navigation }) {
    const [form, setForm] = useState(INITIAL_FORM);
    const [scannerVisible, setScannerVisible] = useState(false);

    function updateField(campo, valor) {
        setForm((prev) => ({ ...prev, [campo]: valor }));
    }

    function handleClear() {
        setForm(INITIAL_FORM);
    }

    function handleScan() {
        // Etapa 2: abrir a câmera para ler o código de barras
        console.log("Abrir leitor de código de barras");
        setScannerVisible(true);
    }

    function handleScanned(codigo) {
        // Etapa 3: preencher o campo de código com o valor lido
        console.log("Código lido:", codigo);
        updateField("codigo", codigo);
        setScannerVisible(false);
    }

    function handleSave() {
        // Depois: validar e enviar para a API
        console.log(form);
    }

    return (
        <ScreenContainer header={<Header subtitle="A gestão do seu estoque" />}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.navigate("Home")}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Cadastrar item</Text>

                <View style={styles.card}>
                    <InputBox placeholder="Nome do produto" value={form.nome}
                        onChangeText={(v) => updateField("nome", v)} />

                    <View style={styles.codeRow}>
                        <View style={styles.codeInput}>
                            <InputBox placeholder="Código do produto" value={form.codigo}
                                onChangeText={(v) => updateField("codigo", v)} />
                        </View>
                        <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
                            <Ionicons name="barcode-outline" size={28} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <InputBox placeholder="Preço (R$)" keyboardType="decimal-pad" value={form.preco}
                        onChangeText={(v) => updateField("preco", v)} />
                    <InputBox placeholder="Quantidade mínima" keyboardType="numeric" value={form.quantidadeMinima}
                        onChangeText={(v) => updateField("quantidadeMinima", v)} />
                    <InputBox placeholder="Quantidade" keyboardType="numeric" value={form.quantidade}
                        onChangeText={(v) => updateField("quantidade", v)} />
                    <SelectBox placeholder="Categoria" options={CATEGORIES} value={form.categoria}
                        onChange={(v) => updateField("categoria", v)} />

                    <View style={styles.buttonRow}>
                        <Button title="Limpar" variant="danger" onPress={handleClear} style={styles.rowButton} />
                        <Button title="Cadastrar" onPress={handleSave} style={styles.rowButton} />
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
    buttonRow: { flexDirection: "row", gap: 16, marginTop: 24,  },
    rowButton: { flex: 1, width: "auto", marginBottom: 0 },
});