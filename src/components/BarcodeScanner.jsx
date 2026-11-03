import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import Button from "./Button";

export default function BarcodeScanner({ visible, onClose, onScanned }) {       
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        if (visible) {
            setScanned(false);
        }
    }, [visible]);

    function handleBarcode({ data }) {
        setScanned(true);
        onScanned(data);
    }

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={styles.container}>
                {!permission ? null : !permission.granted ? (
                    <View style={styles.permission}>
                        <Text style={styles.permissionText}>Precisamos da sua permissão para usar a câmera.</Text>
                        <Button title=" Permitir" onPress={requestPermission} />
                        <Button title="Não Permitir" onPress={onClose} />
                    </View>
                ) : (
                    <>
                    <CameraView
                            style={StyleSheet.absoluteFill}
                            facing="back"
                            barcodeScannerSettings={{
                                barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code128", "code39"],
                            }}
                            onBarcodeScanned={scanned ? undefined : handleBarcode}
                        />
                        <View style={styles.frame} />
                        <Text style={styles.hint}>Aponte para o código de barras</Text>
                        <TouchableOpacity style={styles.close} onPress={onClose}>
                            <Ionicons name="close" size={32} color="#fff" />
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </Modal>
    );
}           

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#000",
        alignItems: "center", justifyContent: "center",
    },
    permission: {
        flex: 1, width: "100%", backgroundColor: "#fff",
        alignItems: "center", justifyContent: "center", padding: 32,
    },
    permissionText: { fontSize: 16, textAlign: "center", marginBottom: 24 },
    frame: {
        width: 260, height: 160,
        borderWidth: 3, borderColor: "#fff", borderRadius: 12,
    },
    hint: { color: "#fff", fontSize: 16, marginTop: 20 },
    close: { position: "absolute", top: 50, right: 20 },
});