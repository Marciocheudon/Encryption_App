// Importação do polyfill deve ser a primeira
import 'react-native-get-random-values';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

export default function DecryptScreen({ route, navigation }) {
    const { textoCriptografado } = route.params;
    const [chave, setChave] = useState('');
    const [textoDescriptografado, setTextoDescriptografado] = useState('');
    const [isDecrypted, setIsDecrypted] = useState(false);

    const descriptografarTexto = () => {
        if (chave === '') {
            Alert.alert('Erro', 'Por favor, insira a chave de criptografia.');
            return;
        }
        try {
            const bytes = CryptoJS.AES.decrypt(textoCriptografado, chave);
            const textoDecifrado = bytes.toString(CryptoJS.enc.Utf8);
            if (!textoDecifrado) {
                Alert.alert('Erro', 'Chave incorreta ou texto inválido.');
                return;
            }
            setTextoDescriptografado(textoDecifrado);
            setIsDecrypted(true);
        } catch (error) {
            Alert.alert('Erro', 'Falha ao descriptografar o texto.');
        }
    };

    const deletarTexto = async () => {
        if (!isDecrypted) {
            Alert.alert('Erro', 'Você só pode deletar o texto após descriptografá-lo.');
            return;
        }
        try {
            let textosArmazenados = await AsyncStorage.getItem('textos');
            textosArmazenados = textosArmazenados ? JSON.parse(textosArmazenados) : [];
            const updatedTextos = textosArmazenados.filter(item => item !== textoCriptografado);
            await AsyncStorage.setItem('textos', JSON.stringify(updatedTextos));
            Alert.alert('Sucesso', 'Texto deletado com sucesso.');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Falha ao deletar o texto.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.label}>Texto Criptografado:</Text>
                <Text style={styles.encryptedText}>{textoCriptografado}</Text>
                <TextInput
                    placeholder="Insira a chave de criptografia"
                    style={styles.input}
                    secureTextEntry
                    value={chave}
                    onChangeText={setChave}
                />
                <Button title="Descriptografar Texto" onPress={descriptografarTexto} />
                {textoDescriptografado !== '' && (
                    <View style={styles.decryptedContainer}>
                        <Text style={styles.label}>Texto Descriptografado:</Text>
                        <Text style={styles.decryptedText}>{textoDescriptografado}</Text>
                        <Button title="Deletar Texto" onPress={deletarTexto} color="red" />
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    contentContainer: {
        width: '80%',
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        marginTop: 15,
        textAlign: 'center',
    },
    encryptedText: {
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    decryptedContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    decryptedText: {
        fontSize: 16,
        color: 'green',
        marginBottom: 15,
        textAlign: 'center',
    },
});