import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import ModalContextProvider from "@/contexts/ModalContext";
import AuthProvider from "@/contexts/AuthContext";
import UserContextProvider from "@/contexts/UserContext";
import FenceDataContextProvider from "@/contexts/FenceDataContext";
import PreviewContextProvider from "@/contexts/PreviewContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    // Inter font family
    inter: require("../assets/fonts/Inter_28pt-Regular.ttf"),
    "inter-medium": require("../assets/fonts/Inter_24pt-Medium.ttf"),
    "inter-semibold": require("../assets/fonts/Inter_28pt-SemiBold.ttf"),
    "inter-bold": require("../assets/fonts/Inter_28pt-Bold.ttf"),
    "inter-extrabold": require("../assets/fonts/Inter_28pt-ExtraBold.ttf"),
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
    <AuthProvider>
      <UserContextProvider>
        <ModalContextProvider>
          <FenceDataContextProvider>
            <PreviewContextProvider>
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="index" />
                </Stack>
            </PreviewContextProvider>
          </FenceDataContextProvider>
        </ModalContextProvider>
      </UserContextProvider>
    </AuthProvider>
  );
}
