import { StyleSheet, Text, TouchableOpacity } from "react-native";

const BLUE = "#0045C4"

export default function Button({title, variant = 'primary', onPress}){
    const isPrimary = variant === 'primary';

    return(
        <TouchableOpacity 
        style={[styles.base, isPrimary ? styles.primary : styles.outline]}
        onPress={onPress}
        >
            <Text style={[styles.text, isPrimary ? styles.textPrimary : styles.textOutline]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    base:{
        width: '70%',
        height:44,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:12,
    },
    primary:{backgroundColor: BLUE, alignItems:'center'},
    outline:{borderWidth:2, borderColor: BLUE, backgroundColor:"#fff", alignItems:'center'},
    text:{fontSize:17, fontWeight:"600"},
    textPrimary: {color: "#fff"},
    textOutline: { color:BLUE},
})