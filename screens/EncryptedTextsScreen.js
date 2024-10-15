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

    const handleDecrypt = (index) => {
        navigation.navigate('Descriptografar Texto', {
            textoCriptografado: textos[index],
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={textos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => handleDecrypt(index)}>
                            <View style={styles.item}>
                                <Text>{item}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    item: {
        padding: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
});