Aplicativo de Criptografia de Texto

Este é um aplicativo de criptografia de texto desenvolvido em React Native usando Expo. O objetivo do aplicativo é permitir que os usuários criptografem textos utilizando uma chave de criptografia, armazenem os textos criptografados localmente e, posteriormente, possam descriptografar esses textos usando a chave correta.

Funcionalidades

Criptografar Texto: Insira um texto e uma chave de criptografia para criptografar e armazenar o texto.

Armazenamento Local: Todos os textos criptografados são armazenados localmente no dispositivo usando expo-sqlite.

Visualizar Textos Criptografados: Visualize a lista de textos criptografados armazenados.

Descriptografar Texto: Selecione um texto criptografado e insira a chave para descriptografá-lo.

Tecnologias Utilizadas

React Native: Framework para desenvolvimento de aplicativos móveis multiplataforma.

Expo: Ferramenta para facilitar o desenvolvimento e execução do aplicativo.

SQLite (expo-sqlite): Banco de dados local para armazenar os textos criptografados.

CryptoJS: Biblioteca para realizar a criptografia e descriptografia dos textos.

Como Executar o Projeto

Certifique-se de ter o Node.js e o Expo CLI instalados em seu ambiente.

Clone este repositório:

Navegue até o diretório do projeto:

Instale as dependências do projeto:

Inicie o aplicativo com o Expo:

Abra o aplicativo em um emulador Android/iOS ou em um dispositivo físico usando o aplicativo Expo Go.

Uso do Aplicativo

Criptografar Texto:

Insira o texto que deseja criptografar e a chave de criptografia.

Clique no botão "Criptografar e Armazenar" para salvar o texto criptografado localmente.

Visualizar Textos Criptografados:

Na seção "Textos Criptografados", você verá uma lista dos textos criptografados armazenados.

Clique em um texto criptografado para selecioná-lo.

Descriptografar Texto:

Insira a chave de criptografia e clique no botão "Descriptografar Texto Selecionado" para ver o texto original.

Dependências do Projeto

react-native

expo

expo-sqlite

crypto-js

Estrutura do Código

O código principal do aplicativo está contido no arquivo App.js, que contém:

Lógica de criptografia e descriptografia.

Funções para armazenar e recuperar os textos criptografados do banco de dados SQLite.

Interface do usuário, incluindo campos de entrada e botões para criptografar e descriptografar.

Problemas Conhecidos

A chave de criptografia deve ser lembrada pelo usuário. Se a chave correta não for fornecida, o texto não poderá ser descriptografado.

O armazenamento local depende do dispositivo, e a desinstalação do aplicativo resultará na perda dos textos armazenados.

Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

