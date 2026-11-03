import { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import ProductCard from "../components/ProductCard";
import BarcodeScanner from "../components/BarcodeScanner";
import { MOCK_PRODUCTS } from "../constants/mockData";

const BLUE = "#0045C4";


export default function Stock({ navigation }) {
    const [products, setProducts] = useState(MOCK_PRODUCTS);
    const [search, setSearch] = useState("");
    const [scannerVisible, setScannerVisible] = useState(false);

    const termo = search.trim().toLowerCase();
    const filtered = products.filter(
        (p) => p.nome.toLowerCase().includes(termo) || p.codigo.includes(termo)
    );

    function handleScanned(codigo) {
        setSearch(codigo);
        setScannerVisible(false);
    }

    function handleEdit(product) {
        // Depois: abrir a tela de edição
        console.log("Editar:", product);
    }

    function handleDelete(product) {
        Alert.alert(
            "Excluir produto",
            `Deseja excluir "${product.nome}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => setProducts((prev) => prev.filter((p) => p.id !== product.id)),
                },
            ]
        );
    }

    return (
        <ScreenContainer header={<Header subtitle="A gestão do seu estoque" />}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.navigate("Home")}>
                <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>Estoque</Text>

            <View style={styles.searchRow}>
                <View style={styles.searchInput}>
                    <InputBox placeholder="Buscar por nome ou código" icon="search-outline"
                        value={search} onChangeText={setSearch} />
                </View>
                <TouchableOpacity style={styles.scanButton} onPress={() => setScannerVisible(true)}>
                    <Ionicons name="barcode-outline" size={28} color="#000" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filtered}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <ProductCard product={item} onEdit={handleEdit} onDelete={handleDelete} />
                )}
                ListEmptyComponent={<Text style={styles.empty}>Nenhum produto encontrado.</Text>}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

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
        textAlign: "center", marginBottom: 12,
    },
    searchRow: { flexDirection: "row", alignItems: "flex-end", gap: 10, marginBottom: 16 },
    searchInput: { flex: 1 },
    scanButton: {
        borderWidth: 1, borderColor: "#000", borderRadius: 10,
        paddingHorizontal: 10, paddingVertical: 6,
    },
    list: { paddingBottom: 24 },
    empty: { textAlign: "center", color: "#858585", marginTop: 32, fontSize: 15 },
});