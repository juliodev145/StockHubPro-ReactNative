import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const INPUT_BG = "#F5F5F5";
const INPUT_BORDER = "#0045C4";
const ICON_COLOR = "#585858";
const PLACEHOLDER_COLOR ="#858585";

export default function InputBox({placeholder, icon, isPassword, value, onChangeText, keyboardType}){
    const [hidden, setHidden] = useState(true);

    return(
        <View style={styles.container}>
            <View style={styles.inputBox}>
                {icon && (<Ionicons name={icon} size={20} color={ICON_COLOR} style={styles.iconLeft}/> )}
                <TextInput
                    style={styles.input}
                    placeholderTextColor={PLACEHOLDER_COLOR}
                    placeholder={placeholder}
                    secureTextEntry={isPassword && hidden} //deixar a senha oculta
                    value={value}   //mostrar na caixa o valor inserido
                    onChangeText={onChangeText} //mostra na tela cada letra inserida
                    keyboardType={keyboardType} //escolhe qual teclado o celular abre (email-address": teclado com o @ e o .com, numeric)
                    autoCapitalize="none" //desliga a primeira letra maiúscula do teclado
                />

                {isPassword && (<TouchableOpacity onPress={() => setHidden(!hidden)}>
                    <Ionicons
                        name={hidden ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color={ICON_COLOR}
                    />
                </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        marginTop: 10,
    },
    inputBox:{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: INPUT_BG,
        borderRadius: 10,
        borderColor: INPUT_BORDER,
        borderWidth: 1,
        paddingHorizontal: 15,
    },
    iconLeft:{
        marginRight: 8,
    },
    input:{
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
    },
})