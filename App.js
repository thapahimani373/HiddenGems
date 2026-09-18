import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Welcome,
  Login,
  Register,
  Home,
  Explore,
  GemDetails,
  AddGem,
  NearbyGems,
  SavedGems,
  Profile,
} from './src/screens';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: { backgroundColor: '#1b6b50' },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Create Account' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Hidden Gems' }} />
        <Stack.Screen name="Explore" component={Explore} options={{ title: 'Explore Gems' }} />
        <Stack.Screen name="GemDetails" component={GemDetails} options={{ title: 'Gem Details' }} />
        <Stack.Screen name="AddGem" component={AddGem} options={{ title: 'Add a Gem' }} />
        <Stack.Screen name="NearbyGems" component={NearbyGems} options={{ title: 'Gems Near Me' }} />
        <Stack.Screen name="SavedGems" component={SavedGems} options={{ title: 'Saved Offline' }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'My Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
