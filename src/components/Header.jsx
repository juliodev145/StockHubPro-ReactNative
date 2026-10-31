import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "./Logo";

export default function Header({ subtitle }) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
            <Logo width={200} />
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#EEF4FF',
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomWidth: 3,
        borderBottomColor: '#0045C4',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    subtitle: {
        marginTop: 8,
        fontSize: 14,
        color: '#0045C4',
    },
});