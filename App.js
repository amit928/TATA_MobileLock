import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/Components/SplashScreen';
import Home from './screens/Components/Home';
import Login from './screens/Components/Login';
import WelcomeScreen from './screens/Components/WelcomeScreen';
import CreateTask from './screens/Components/CreateTask';
import TodayTask from './screens/Components/TodayTask';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import configureStore from './screens/redux/configureStore';
import { navigationRef } from './screens/RootNavigation';
import Profile from './screens/Components/Profile';
import TaskReport from './screens/Components/TaskReport';
import MyCamera from './screens/Components/MyCamera';

const Stack = createNativeStackNavigator();
const store = configureStore()

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <NativeBaseProvider>
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Camera" component={MyCamera} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerTitle: '', headerTransparent: true, headerTintColor: "white", headerStyle: { backgroundColor: "#004342" } }} />
            <Stack.Screen name="Home" component={Home} options={{ headerBackVisible: false, headerTitle: '', headerTransparent: true }} />
            <Stack.Screen name="CreateTask" component={CreateTask} options={{ headerTitle: 'Create Task', headerTransparent: true, headerTintColor: "white" }} />
            <Stack.Screen name="TodayTask" component={TodayTask} options={{
              headerTitle: "Today's Task", headerTransparent: true, headerTintColor: "white", headerTitleStyle: { fontSize: 17 }
            }} />
            <Stack.Screen name="TaskReport" component={TaskReport} options={{
              headerTitle: "Task Report", headerTransparent: true, headerTintColor: "white", headerTitleStyle: { fontSize: 17 }
            }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerBackVisible: true, headerTitle: 'Profile', headerTransparent: true, headerTintColor: "white" }} />
          </Stack.Navigator>
        </NativeBaseProvider>
      </Provider>
    </NavigationContainer>
  );
}

export default App;