import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { formatMoney } from "../utils/format";

const BLUE = "#0045C4";
const RED = "#E53935";

function Info({ label, value, alert }) {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.value, alert && styles.alert]}>{value}</Text>
        </View>
    );
}

export default function ProductCard({ product, onEdit, onDelete }) {
    const valorTotal = product.preco * product.quantidade;
    const estoqueBaixo = product.quantidade <= product.quantidadeMinima;

    return (
        <View style={styles.card}>
            <Info label="Nome" value={product.nome} />
            <Info label="Código" value={product.codigo} />
            <Info label="Categoria" value={product.categoria} />
            <Info label="Quantidade mínima" value={product.quantidadeMinima} />
            <Info label="Quantidade atual" value={product.quantidade} alert={estoqueBaixo} />
            <Info label="Valor total" value={formatMoney(valorTotal)} />

            <View style={styles.buttonRow}>
                <Button title="Editar" variant="warning" icon="edit-2"
                    onPress={() => onEdit(product)} style={styles.rowButton} />
                <Button title="Excluir" variant="danger" icon="trash-2"
                    onPress={() => onDelete(product)} style={styles.rowButton} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1, borderColor: BLUE, borderRadius: 10,
        padding: 16, marginBottom: 16,
    },
    row: {
        flexDirection: "row", justifyContent: "space-between",
        paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#EEE",
    },
    label: { fontSize: 15, fontWeight: "600", color: "#000" },
    value: { fontSize: 15, color: "#333", flexShrink: 1, textAlign: "right", marginLeft: 12 },
    alert: { color: RED, fontWeight: "bold" },
    buttonRow: { flexDirection: "row", gap: 16, marginTop: 16 },
    rowButton: { flex: 1, width: "auto", marginBottom: 0 },
});