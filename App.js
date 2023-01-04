import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/Home/Home';
import {VerifyEmail} from './src/VerifyEmail/VerifyEmail';
import {FitnessScreen} from './src/FitnessScreen/FitnessScreen';
import {LogBox} from 'react-native';
import {CameraScreen} from './src/CameraScreen/CameraScreen';

const Stack = createStackNavigator();
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="FitnessScreen">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="FitnessScreen" component={FitnessScreen} />
        {/* <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
