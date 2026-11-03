import { TouchableOpacity, Text, StyleSheet } from "react-native";

const BLUE = "#0045C4";
const RED = "#E53935";

export default function Button({ title, variant = "primary", onPress, style }) {
    const bgStyle =
        variant === "outline" ? styles.outline :
        variant === "danger" ? styles.danger :
        styles.primary;

    const textStyle = variant === "outline" ? styles.textOutline : styles.textPrimary;

    return (
        <TouchableOpacity style={[styles.base, bgStyle, style]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        width: "70%", height: 44, borderRadius: 20,
        alignItems: "center", justifyContent: "center", marginBottom: 12,
    },
    primary: { backgroundColor: BLUE },
    outline: { borderWidth: 2, borderColor: BLUE, backgroundColor: "#fff" },
    danger: { backgroundColor: RED },
    text: { fontSize: 17, fontWeight: "bold" },
    textPrimary: { color: "#fff" },
    textOutline: { color: BLUE },
});