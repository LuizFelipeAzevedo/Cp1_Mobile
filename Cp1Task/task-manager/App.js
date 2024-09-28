import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Tela de gerenciamento de tarefas
function TaskManagerScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('@tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (e) {
        console.error('Erro ao carregar tarefas', e);
      }
    };
    loadTasks();
  }, []);

  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasksToSave));
    } catch (e) {
      console.error('Erro ao salvar tarefas', e);
    }
  };

  const handleAddTask = () => {
    if (!task.trim()) {
      Alert.alert('Erro', 'Por favor, insira uma tarefa válida.');
      return;
    }

    const newTask = { id: Date.now().toString(), text: task, completed: false };
    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTask('');
  };

  const handleToggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    Alert.alert('Confirmação', 'Deseja realmente excluir a tarefa?', [
      { text: 'Cancelar' },
      {
        text: 'Sim',
        onPress: () => {
          const updatedTasks = tasks.filter((item) => item.id !== id);
          setTasks(updatedTasks);
          saveTasks(updatedTasks);
        },
      },
    ]);
  };

  const renderTask = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
      <TouchableOpacity onPress={() => handleToggleTaskCompletion(item.id)}>
        <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <Button title="Excluir" onPress={() => handleDeleteTask(item.id)} />
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      <Text>Gerenciador de Tarefas</Text>
      <TextInput
        placeholder="Digite a tarefa"
        value={task}
        onChangeText={setTask}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Adicionar Tarefa" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
      />
    </View>
  );
}

// Tela de configurações 
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Configurações do Aplicativo</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Versão: 1.0.0</Text>
      <Text style={{ marginBottom: 10 }}>Aqui você pode ajustar suas preferências.</Text>

      {/* Exemplo de opções que poderiam ser implementadas */}
      <Button title="Alterar Tema" onPress={() => alert('Função de alterar tema ainda não implementada')} />
      <Button title="Notificações" onPress={() => alert('Função de notificações ainda não implementada')} />
      <Button title="Limpar Histórico" onPress={() => alert('Função de limpar histórico ainda não implementada')} />
    </View>
  );
}


// Configuração do BottomTabNavigator
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tarefas" component={TaskManagerScreen} />
      <Tab.Screen name="Configurações" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Configuração do Stack Navigator
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MyTabs} options={{ title: 'Gerenciador de Tarefas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
