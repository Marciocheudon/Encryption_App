import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, FlatList, Text, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite';
import CryptoJS from 'crypto-js';

// Função para abrir ou criar o banco de dados
const db = SQLite.openDatabase('messages.db');

export default function App() {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [encryptedMessages, setEncryptedMessages] = useState([]);

  // Criar a tabela ao iniciar o app
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT);',
        [],
        () => loadMessages(), // Carregar mensagens após criar a tabela
        (tx, error) => console.log('Error creating table:', error)
      );
    });
  }, []);

  // Carregar mensagens do banco de dados
  const loadMessages = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM messages;',
        [],
        (_, { rows }) => setEncryptedMessages(rows._array),
        (tx, error) => console.log('Error loading messages:', error)
      );
    });
  };

  // Função para criptografar e salvar a mensagem
  const encryptAndSaveMessage = () => {
    if (!message || !key) {
      Alert.alert('Erro', 'Por favor, insira uma mensagem e uma chave.');
      return;
    }

    const encrypted = CryptoJS.AES.encrypt(message, key).toString();

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO messages (text) VALUES (?);',
        [encrypted],
        () => {
          loadMessages(); // Recarregar mensagens após inserir
          setMessage('');
          setKey('');
          Alert.alert('Sucesso', 'Mensagem criptografada e salva.');
        },
        (tx, error) => console.log('Error saving message:', error)
      );
    });
  };

  // Função para descriptografar a mensagem
  const decryptMessage = (encryptedText) => {
    if (!key) {
      Alert.alert('Erro', 'Por favor, insira a chave para descriptografar.');
      return;
    }

    const decrypted = CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
    if (!decrypted) {
      Alert.alert('Erro', 'Chave incorreta ou erro ao descriptografar.');
    } else {
      Alert.alert('Mensagem Descriptografada', decrypted);
    }
  };

  // Renderizar cada mensagem criptografada
  const renderMessageItem = ({ item }) => (
    <TouchableOpacity onPress={() => decryptMessage(item.text)}>
      <View style={{ padding: 10, borderBottomWidth: 1 }}>
        <Text>{item.text}</Text> {/* Mensagem criptografada */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Digite a mensagem"
        value={message}
        onChangeText={setMessage}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Digite a chave de criptografia"
        value={key}
        onChangeText={setKey}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Button title="Criptografar e Salvar" onPress={encryptAndSaveMessage} />

      <FlatList
        data={encryptedMessages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id.toString()}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}
