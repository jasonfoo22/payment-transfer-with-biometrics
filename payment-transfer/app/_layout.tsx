import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { NormalizeRoutes } from '@/constants/Routes';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Poppins-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name={NormalizeRoutes.loginLoading} options={{ animation: 'none' }} />
        <Stack.Screen name={NormalizeRoutes.tabs} options={{ gestureEnabled: false }} />
        <Stack.Screen name={NormalizeRoutes.transfer.sendMoney} />
        <Stack.Screen name={NormalizeRoutes.transfer.selectContact} />
        <Stack.Screen name={NormalizeRoutes.transfer.confirmation} />
        <Stack.Screen name={NormalizeRoutes.transfer.success} options={{ gestureEnabled: false }} />
        <Stack.Screen name={NormalizeRoutes.notFound} />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  );
}
