import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/Login';
import { HomeScreen } from '../screens/Home';
import { NewTodoScreen } from '../screens/NewTodo';
import { createStaticNavigation } from '@react-navigation/native';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screens: {
    Login: LoginScreen,
    Home: HomeScreen,
    NewTodo: NewTodoScreen,
  },
  screenOptions: {
    headerShown: false,
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackType = typeof RootStack;

declare module '@react-navigation/native' {
  interface RootNavigator extends RootStackType {}
}
