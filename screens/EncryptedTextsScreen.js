import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EncryptedTextsScreen({ navigation }) {
    const [textos, setTextos] = useState([]);

    useEffect(() => {
        const obterTextos = async () => {
            try {
                let textosArmazenados = await AsyncStorage.getItem('textos');
                textosArmazenados = textosArmazenados ? JSON.parse(textosArmazenados) : [];
                setTextos(textosArmazenados);
            } catch (error) {
                Alert.alert('Erro', 'Falha ao carregar os textos.');
            }
        };
        const unsubscribe = navigation.addListener('focus', obterTextos);
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FlatList
                data={textos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Descriptografar Texto', { textoCriptografado: item })
                        }
                    >
                        <View style={styles.item}>
                            <Text>{item}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text>Nenhum texto criptografado encontrado.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    item: {
        padding: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});
