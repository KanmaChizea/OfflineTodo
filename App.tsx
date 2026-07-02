import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/navigation';
import { TodoProvider } from './src/services/todo';
import { ThemeProvider } from './src/services/theme';
import { useEffect } from 'react';
import { useTodoSyncEngine } from './src/services/sync_engine';
import { addEventListener } from '@react-native-community/netinfo';

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TodoProvider>
          <AppContent />
        </TodoProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;

const AppContent = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const { sync } = useTodoSyncEngine();

  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      if (state.isInternetReachable) {
        sync();
      }
    });

    unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Navigation />
    </>
  );
};
