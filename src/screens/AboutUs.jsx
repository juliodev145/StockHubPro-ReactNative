import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";

const BLUE = "#0045C4";

export default function AboutUs({navigation}){
    return(
        <ScreenContainer header={<Header subtitle="A gestão do seu estoque" />}>
            <ScrollView showsVerticalScrollIndicator={false}>   {/**esconde a barra lateral de rolagem */}
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#000"/>
                </TouchableOpacity>

                <Text style={styles.title}>Quem somos?</Text>
                <Text style={styles.paragraph}>
                    Somos uma empresa especializada no desenvolvimento de soluções
                    tecnológicas para gestão de estoque.                    
                </Text>
                <Text style={styles.paragraph}>
                    Nosso objetivo é ajudar empresas a organizar, controlar e otimizar
                    seus produtos de forma simples, eficiente e segura.
                </Text>

                <Text style={styles.title}>Suporte e Atendimento</Text>
                <Text style={styles.paragraph} >Precisa de ajuda com o sistema?</Text>
                <View style={styles.contact}>
                    <Feather name="phone" size={20} color="#0045C4"/>
                    <View style={styles.contactText}>
                        <Text>Telefone</Text>
                        <Text>(21) 3000-0000</Text>
                    </View>
                </View>
                <View style={styles.contact}>
                    <Feather name="message-circle" size={22} color="#25D366"/>
                    <View style={styles.contactText}>
                        <Text>WhatsApp</Text>
                        <Text>(21) 98888-0000</Text>
                    </View>
                </View>
                    <View style={styles.contact}>
                    <Feather name="mail" size={22} color="#E53935"/>
                    <View style={styles.contactText}>
                        <Text>E-mail</Text>
                        <Text>stockhubpro@suporte.com.br</Text>
                    </View>
                </View>
                <Text style={styles.paragraph}>
                    Nossa equipe está pronta para atender você e esclarecer suas dúvidas.
                </Text>

            </ScrollView>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    back:{
        marginTop:16,
        marginBottom:8,
        alignSelf:'flex-start',
    },
    title:{
        fontSize:17,
        color: BLUE,
        fontWeight:600,
        marginTop:16,
        marginBottom:12,
    },
    paragraph:{
        fontSize: 16,
        color:"#000",
        lineHeight:22,
        marginBottom:16,
    },
    contact:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:20,
    },
    contactText:{
        marginLeft: 14,
    },
})