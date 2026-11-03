import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#0045C4";
const INPUT_BG = "#F5F5F5";
const ICON_COLOR = "#585858";
const PLACEHOLDER_COLOR = "#858585";

export default function SelectBox({ placeholder, options, value, onChange }) {
    const [open, setOpen] = useState(false);

    function handleSelect(item) {
        onChange(item);
        setOpen(false);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.box} onPress={() => setOpen(true)}>
                <Text style={[styles.text, !value && styles.placeholder]}>
                    {value || placeholder}
                </Text>
                <Ionicons name="chevron-down" size={20} color={ICON_COLOR} />
            </TouchableOpacity>

            <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
                <View style={styles.overlay}>
                    <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />

                    <View style={styles.sheet}>
                        <Text style={styles.sheetTitle}>{placeholder}</Text>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
                                    <Text style={[styles.optionText, item === value && styles.optionSelected]}>
                                        {item}
                                    </Text>
                                    {item === value && <Ionicons name="checkmark" size={20} color={BLUE} />}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: "100%", marginTop: 10 },
    box: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        backgroundColor: INPUT_BG, borderRadius: 10, borderColor: BLUE, borderWidth: 1,
        paddingHorizontal: 15, paddingVertical: 10,
    },
    text: { fontSize: 16, color: "#000" },
    placeholder: { color: PLACEHOLDER_COLOR },
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
    sheet: {
        backgroundColor: "#fff", maxHeight: "60%",
        borderTopLeftRadius: 16, borderTopRightRadius: 16,
        paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32,
    },
    sheetTitle: {
        fontSize: 17, fontWeight: "600", color: BLUE,
        textAlign: "center", marginBottom: 12,
    },
    option: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
        paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#EEE",
    },
    optionText: { fontSize: 16, color: "#000" },
    optionSelected: { color: BLUE, fontWeight: "600" },
});