import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/Login';
import { HomeScreen } from '../screens/Home';
import { NewTodoScreen } from '../screens/NewTodo';
import { createStaticNavigation } from '@react-navigation/native';

const RootStack = createNativeStackNavigator({
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

//
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { LoginScreen } from '../screens/Login';
// import { HomeScreen } from '../screens/Home';
// import { NewTodoScreen } from '../screens/NewTodo';
//
// export type RootStackParamList = {
//   Login: undefined;
//   Home: undefined;
//   NewTodo: undefined;
// };
//
// const Stack = createNativeStackNavigator<RootStackParamList>();
//
// export const Navigation = () => (
//   <NavigationContainer>
//     <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="NewTodo" component={NewTodoScreen} />
//     </Stack.Navigator>
//   </NavigationContainer>
// );
//
// declare module '@react-navigation/native' {
//   interface RootNavigator extends RootStackParamList {}
// }
//
// ═══════════════════════════════════════════════════════════════
