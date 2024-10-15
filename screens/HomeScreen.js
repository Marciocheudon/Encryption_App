// Importação do polyfill deve ser a primeira
import 'react-native-get-random-values';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

export default function HomeScreen({ navigation }) {
    const [texto, setTexto] = useState('');
    const [chave, setChave] = useState('');

    const criptografarTexto = async () => {
        if (texto === '' || chave === '') {
            Alert.alert('Erro', 'Por favor, insira o texto e a chave de criptografia.');
            return;
        }
        try {
            const textoCriptografado = CryptoJS.AES.encrypt(texto, chave).toString();
            let textosArmazenados = await AsyncStorage.getItem('textos');
            textosArmazenados = textosArmazenados ? JSON.parse(textosArmazenados) : [];
            textosArmazenados.push(textoCriptografado);
            await AsyncStorage.setItem('textos', JSON.stringify(textosArmazenados));
            Alert.alert('Sucesso', 'Texto criptografado e armazenado com sucesso!');
            setTexto('');
            setChave('');
        } catch (error) {
            Alert.alert('Erro', 'Falha ao criptografar o texto.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.image} />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Insira o texto"
                    style={styles.input}
                    value={texto}
                    onChangeText={setTexto}
                />
                <TextInput
                    placeholder="Insira a chave de criptografia"
                    style={styles.input}
                    secureTextEntry
                    value={chave}
                    onChangeText={setChave}
                />
                <Button title="Criptografar Texto" onPress={criptografarTexto} />
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Mostrar Textos Criptografados"
                        onPress={() => navigation.navigate('Textos Criptografados')}
                    />
                </View>
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
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});