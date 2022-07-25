import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import Home from './screens/Home';
import Login from './screens/Login';
import WelcomeScreen from './screens/WelcomeScreen';
import CreateTask from './screens/CreateTask';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerTitle: '', headerTransparent: true, headerTintColor:"white" }} />
        <Stack.Screen name="Home" component={Home} options={{ headerBackVisible: false,  headerTitle: '', headerTransparent: true  }} />
        <Stack.Screen name="CreateTask" component={CreateTask} options={{  headerTitle: 'Create Task', headerTransparent: true,  headerTintColor:"white"  }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;