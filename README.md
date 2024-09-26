# Task Manager - Grupo Criativo

## Descrição do Projeto

Este aplicativo é um gerenciador de tarefas simples, desenvolvido como parte do trabalho #CP1: MAD. Ele permite adicionar, editar e excluir tarefas, além de armazená-las localmente no dispositivo.

## Funcionalidades
- Adicionar novas tarefas
- Excluir tarefas
- Armazenar dados usando AsyncStorage

## Tecnologias Utilizadas

- **Expo**: Versão 0.72
- **React Native**: Versão 0.74.5
- **AsyncStorage**: Versão 1.23.1

## Estrutura do Projeto

O projeto utiliza **Navigation** para alternar entre as telas de tarefas e configurações.

### Componentes Utilizados

- **View**: Estrutura a interface do usuário.
- **StackView**: Gerencia a navegação entre as telas.
- **Header**: Customizado pelo Stack Navigator.
- **BottomTabNavigator**: Navegação por abas entre telas principais.
- **Text**: Exibe textos no aplicativo.
- **TextInput**: Permite ao usuário inserir o nome das tarefas.
- **Button**: Executa ações como adicionar ou excluir tarefas.
- **Alert**: Mostra confirmações de exclusão de tarefas.
- **AsyncStorage**: Armazena e recupera tarefas de forma persistente.

## Como Executar o Projeto

1. Clone o repositório e instale as dependências:
   ```bash
   npm install 
2. Inicie o projeto :
   npx expo start
