import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import Button from "../components/Button";
import { MOCK_COMPANY, MOCK_PRODUCTS, MOCK_SUMMARY } from "../constants/mockData";
import { formatDate, formatMoney, MONTHS } from "../utils/format";
import { buildReportHtml } from "../utils/reportHtml";
import { File, Paths } from "expo-file-system";

const BLUE = "#0045C4";
const RED = "#E53935";

export default function Report({ navigation }) {
    const hoje = new Date();
    const [ano, setAno] = useState(hoje.getFullYear());
    const [mes, setMes] = useState(hoje.getMonth());
    const [gerando, setGerando] = useState(false);

    const inicio = new Date(ano, mes, 1);
    const fim = new Date(ano, mes + 1, 0);
    const isMesAtual = ano === hoje.getFullYear() && mes === hoje.getMonth();

    const products = MOCK_PRODUCTS;
    const summary = MOCK_SUMMARY;
    const valorEstoque = products.reduce((total, p) => total + p.preco * p.quantidade, 0);
    const alertas = products.filter((p) => p.quantidade <= p.quantidadeMinima);

    function mesAnterior() {
        if (mes === 0) {
            setMes(11);
            setAno(ano - 1);
        } else {
            setMes(mes - 1);
        }
    }

    function proximoMes() {
        if (isMesAtual) return;
        if (mes === 11) {
            setMes(0);
            setAno(ano + 1);
        } else {
            setMes(mes + 1);
        }
    }

async function handleGerarPdf() {
    setGerando(true);
    try {
        const html = buildReportHtml({
            company: MOCK_COMPANY, products, summary, ano, mes, inicio, fim,
        });

        const { base64 } = await Print.printToFileAsync({ html, base64: true });
        const bytes = Uint8Array.from(atob(base64), (letra) => letra.charCodeAt(0));

        const nomeArquivo = `Relatorio_${MONTHS[mes]}_${ano}.pdf`;
        const destino = new File(Paths.document, nomeArquivo);
        if (destino.exists) destino.delete();
        destino.write(bytes);

        await Sharing.shareAsync(destino.uri, {
            mimeType: "application/pdf",
            dialogTitle: "Relatório StockHub Pro",
            UTI: "com.adobe.pdf",
        });
    } catch (error) {
        console.log("Erro ao gerar PDF:", error);
        Alert.alert("Erro", String(error?.message ?? error));
    } finally {
        setGerando(false);
    }
}
    return (
        <ScreenContainer header={<Header subtitle="A gestão do seu estoque" />}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.title}>Relatório mensal</Text>

                <View style={styles.monthSelector}>
                    <TouchableOpacity onPress={mesAnterior} style={styles.arrow}>
                        <Feather name="chevron-left" size={28} color={BLUE} />
                    </TouchableOpacity>
                    <Text style={styles.monthText}>{MONTHS[mes]} {ano}</Text>
                    <TouchableOpacity onPress={proximoMes} style={styles.arrow} disabled={isMesAtual}>
                        <Feather name="chevron-right" size={28} color={isMesAtual ? "#CCC" : BLUE} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.period}>
                    Período: {formatDate(inicio)} a {formatDate(fim)}
                </Text>
                {isMesAtual && <Text style={styles.partial}>Mês em andamento: dados parciais.</Text>}

                <View style={styles.row}>
                    <StatCard title="Entradas" value={summary.entradas} style={styles.halfCard} />
                    <StatCard title="Saídas" value={summary.saidas} style={styles.halfCard} />
                </View>
                <View style={styles.row}>
                    <StatCard title="Saldo" value={summary.entradas - summary.saidas} style={styles.halfCard} />
                    <StatCard title="Valor em estoque" value={formatMoney(valorEstoque)} style={styles.halfCard} />
                </View>

                <Text style={styles.sectionTitle}>Alertas de estoque baixo</Text>
                {alertas.length === 0 ? (
                    <Text style={styles.ok}>Nenhum produto abaixo do mínimo.</Text>
                ) : (
                    alertas.map((p) => (
                        <Text key={p.id} style={styles.alertItem}>
                            • {p.nome}: {p.quantidade} (mínimo {p.quantidadeMinima})
                        </Text>
                    ))
                )}

                <View style={styles.buttonArea}>
                    <Button
                        title={gerando ? "Gerando..." : "Gerar PDF"}
                        icon="file-text"
                        onPress={handleGerarPdf}
                    />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    back: { marginTop: 16, marginBottom: 8, alignSelf: "flex-start" },
    title: {
        fontSize: 17, color: BLUE, fontWeight: "600",
        textAlign: "center", marginBottom: 16,
    },
    monthSelector: {
        flexDirection: "row", alignItems: "center", justifyContent: "center",
        borderWidth: 1, borderColor: BLUE, borderRadius: 10, paddingVertical: 8,
    },
    arrow: { paddingHorizontal: 16 },
    monthText: { fontSize: 18, fontWeight: "600", color: "#000", minWidth: 160, textAlign: "center" },
    period: { textAlign: "center", fontSize: 14, color: "#333", marginTop: 12 },
    partial: { textAlign: "center", fontSize: 13, color: "#858585", marginTop: 4 },
    row: { flexDirection: "row", gap: 16, marginTop: 16 },
    halfCard: { flex: 1 },
    sectionTitle: { fontSize: 16, fontWeight: "600", color: BLUE, marginTop: 28, marginBottom: 8 },
    ok: { fontSize: 15, color: "#333" },
    alertItem: { fontSize: 15, color: RED, marginBottom: 4 },
    buttonArea: { alignItems: "center", marginTop: 32, marginBottom: 24 },
});