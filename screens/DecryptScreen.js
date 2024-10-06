// Importação do polyfill deve ser a primeira
import 'react-native-get-random-values';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import CryptoJS from 'crypto-js';

export default function DecryptScreen({ route }) {
    const { textoCriptografado } = route.params;
    const [chave, setChave] = useState('');
    const [textoDescriptografado, setTextoDescriptografado] = useState('');

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
        } catch (error) {
            Alert.alert('Erro', 'Falha ao descriptografar o texto.');
        }
    };

    return (
        <View style={styles.container}>
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
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontWeight: 'bold',
        marginTop: 15,
    },
    encryptedText: {
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    decryptedContainer: {
        marginTop: 20,
    },
    decryptedText: {
        fontSize: 16,
        color: 'green',
    },
});
