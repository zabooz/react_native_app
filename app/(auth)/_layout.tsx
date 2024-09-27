import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GlobalProvider } from "@/context/GlobalProvider";
const Layout = () => {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="sign_in" options={{ headerShown: false }} />
        <Stack.Screen name="sign_up" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </GlobalProvider>
  );
};

export default Layout;
