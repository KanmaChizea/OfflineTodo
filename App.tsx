import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/navigation';
import { TodoProvider } from './src/services/todo';
import { ThemeProvider, useTheme } from './src/services/theme';
import { useNetInfo } from '@react-native-community/netinfo';
import { Typography } from './src/components/Typography';

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
  const { isConnected } = useNetInfo();
  const isRooted = true;
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {!isConnected && <NoInternetBanner />}
      <Navigation />
    </>
  );
};

const NoInternetBanner = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.bannerContainer, { backgroundColor: colors.primary }]}>
      <Typography weight="700" color={colors.text} textAlign="center">
        {'No Internet'}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  bannerContainer: {
    paddingVertical: 4,
  },
});
