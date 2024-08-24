import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from './src/screens/Home';
import {AddRound} from './src/screens/AddRound';
import {DeleteRound} from './src/screens/DeleteRound';
import {NewGame} from './src/screens/NewGame';

const App = () => {
  const config = {
    // strictMode: 'warn',
  };

  const customTheme = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  };
  const theme = extendTheme({config: customTheme});

  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  return (
    <NativeBaseProvider config={config} theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddRound" component={AddRound} />
          <Stack.Screen name="DeleteRound" component={DeleteRound} />
          <Stack.Screen name="NewGame" component={NewGame} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
