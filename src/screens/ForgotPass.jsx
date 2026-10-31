import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { Feather } from "@expo/vector-icons";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import { useState } from "react";
import Button from "../components/Button";

const BLUE = "#0045C4";

export default function ForgotPass(){
    const [email, setEmail] = useState("");

    /**
     *  function handleContinue() {
        // Depois enviaremos o e-mail para a API
        console.log("E-mail digitado:", email);
    }
     */

    return(
        <ScreenContainer header={<Header subtitle="A gestão do seu estoque" />}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.back}>
                    <Feather name="arrow-left" size={24} color="#000"/>
                </TouchableOpacity> 

                <Text style={styles.title}>Esqueceu sua senha?</Text>
                <Text style={styles.subtitle}>Redefina sua senha em duas etapas.</Text>

                <InputBox
                    placeholder="Digite seu e-mail"
                    icon="mail"
                    keyboardType="email-adress"
                    value={email}
                    onChangeText={setEmail}
                />

                <View style={styles.button}>
                <Button title="Continuar" />   {/**onPress={handleContinue} */}    
                </View>
                

            </ScrollView>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize:17,
        color: BLUE,
        fontWeight:600,
        marginTop:16,
        marginBottom:12,
        textAlign: 'center',
    },
    subtitle:{
        fontSize:14, 
        color: "#333",
        marginTop:20,
        marginBottom:28,
        textAlign:'center',
    },
    back:{
        marginTop:16,
        marginBottom:8,
        alignSelf:'flex-start',
    },
    button:{
        alignItems: 'center',
        marginTop: 24,
    },
})