import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenContainer({children, style, header}){
    return(
        <SafeAreaView 
            style={styles.safe}
            edges={header ? ["bottom", "left", "right"] : ["top", "bottom", "left", "right"]}
        >
            {header}
            <View style={[styles.content, style]}>
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe:{
        flex:1,
        backgroundColor:"#fff",
    },
    content:{
        flex:1,
        paddingHorizontal: 32,
    },
})