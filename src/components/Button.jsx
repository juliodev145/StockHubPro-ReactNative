import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const BLUE = "#0045C4";
const RED = "#E53935";
const YELLOW = "#FFD600";

export default function Button({ title, variant = "primary", onPress, style, icon }) {
    const bgStyle =
        variant === "outline" ? styles.outline :
        variant === "danger" ? styles.danger :
        variant === "warning" ? styles.warning :
        styles.primary;

    const textColor =
        variant === "outline" ? BLUE :
        variant === "warning" ? "#000" :
        "#fff";

    return (
        <TouchableOpacity style={[styles.base, bgStyle, style]} onPress={onPress}>
            {icon && <Feather name={icon} size={18} color={textColor} style={styles.icon} />}
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        width: "70%", height: 44, borderRadius: 20, flexDirection: "row",
        alignItems: "center", justifyContent: "center", marginBottom: 12,
    },
    primary: { backgroundColor: BLUE },
    outline: { borderWidth: 2, borderColor: BLUE, backgroundColor: "#fff" },
    danger: { backgroundColor: RED },
    warning: { backgroundColor: YELLOW },
    icon: { marginRight: 8 },
    text: { fontSize: 17, fontWeight: "bold" },
});