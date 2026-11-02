import { useState } from "react";
import ScreenContainer from "../components/ScreenContainer";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import InputBox from "../components/InputBox";
import Header from "../components/Header";
import Button from "../components/Button";

const BLUE = "#0045C4";

export default function Register({navigation}){
    
    const [form, setForm] = useState({
        nome: "",
        email:"",
        senha:"",
        confirmarSenha:"",
        empresa:"",
        cnpj:"",
        cep:"",
        logradouro:"",
        numero:"",
        bairro:"",
        cidade:"",
        estado:"",
    });
    const [loadingCep, setLoadingCep] = useState(false);
    const [cepErro, setCepErro] = useState("");

    //função para atualizar os campos do formulário
    function updateField(campo, valor){
        setForm((prev) => ({...prev, [campo] : valor})) //
    }

    function handleCep(valor){
        updateField("cep", valor);
        const cepLimpo = valor.replace(/\D/g, "");  //remove tudo que não for número
        if(cepLimpo.length ===8){
            buscarCep(cepLimpo);
        }
    }

    //toda função que faz requisição tem que ser async. Toda função que usa await tem que ser async
    async function buscarCep(cep){
        setLoadingCep(true);
        setCepErro("");
        try{    //tente 
            const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);  //fetch é uma função que faz a requisição.
            const dados = await resposta.json();

            if(dados.erro){
                setCepErro("CEP não encontrado.");
                return;
            }

            setForm((prev) => ({
                ...prev,
                logradouro: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.estado ?? dados.uf,   //senão vier nada, traz a UF.
            }));
        } catch{    //se der erro, mostre uma mensagem amigável.
            setCepErro("Não foi possível buscar o CEP. Verifique sua conexão.");
        } finally {     //sempre executa, mesmo que dê erro ou não.
            setLoadingCep(false);
        }
    }

    function handleRegister(){
        //depois - validar e enviar para a API
        console.log(form);
    }

    return(
        <ScreenContainer header = {<Header subtitle="A gestão do seu estoque"/>}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#000"/>
                </TouchableOpacity>

                <Text style={styles.title}>Crie sua conta</Text>

                <InputBox placeholder="Nome" value={form.nome}
                    onChangeText={(v) => updateField("nome", v)}/>  {/** updateField - atualizar os campos do formulário*/}

                <InputBox placeholder="E-mail" icon="mail-outline" keyboardType="email-address"
                    value={form.email} onChangeText={(v) => updateField("email", v)} />

                <InputBox placeholder="Senha" isPassword value={form.senha}
                    onChangeText={(v) => updateField("senha", v)} />

                <InputBox placeholder="Repita a senha" isPassword value={form.confirmarSenha}
                    onChangeText={(v) => updateField("confirmarSenha", v)} />

                <InputBox placeholder="Nome da empresa" value={form.empresa}
                    onChangeText={(v) => updateField("empresa", v)} />

                <InputBox placeholder="CNPJ" keyboardType="numeric" value={form.cnpj}
                    onChangeText={(v) => updateField("cnpj", v)} />      

                <InputBox placeholder="CEP" keyboardType="numeric" value={form.cep}
                    onChangeText={handleCep} />

                {loadingCep && <ActivityIndicator color={BLUE} style={styles.loading} />}   {/** "Bolinha de carregamento" */}
                {cepErro !== "" && <Text style={styles.error}>{cepErro}</Text>}

                <InputBox placeholder="Logradouro" value={form.logradouro}
                    onChangeText={(v) => updateField("logradouro", v)} />

                <InputBox placeholder="Bairro" value={form.bairro}
                    onChangeText={(v) => updateField("bairro", v)} />

                <InputBox placeholder="Cidade" value={form.cidade}
                    onChangeText={(v) => updateField("cidade", v)} />

                <InputBox placeholder="Estado" value={form.estado}
                    onChangeText={(v) => updateField("estado", v)} />

                <InputBox placeholder="Número" keyboardType="numeric" value={form.numero}
                    onChangeText={(v) => updateField("numero", v)} />

                <View style={styles.buttonArea}>
                    <Button title="Cadastrar" onPress={handleRegister} />
                    <Button title="Fazer login" variant="outline" onPress={() => navigation.navigate("Login")}/>
                </View>

            </ScrollView>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    back: {
        marginTop: 16,
        marginBottom: 8,
        alignSelf: "flex-start",
    },
    title: {
        fontSize: 17, color: BLUE, fontWeight: "600",
        textAlign: "center", marginBottom: 12,
    },    
    loading: { marginTop: 8 },
    error: { 
        color: "#D32F2F", 
        fontSize: 13, 
        marginTop: 6 
    },
    buttonArea: { 
        alignItems: "center", 
        marginTop: 24, 
        marginBottom: 24 
    },
})