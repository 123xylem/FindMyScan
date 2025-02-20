import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthNavigator } from "./src/navigation/AuthNavigator";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { RootStackParamList } from "./src/types/index";
import { AuthProvider, useAuth } from "./src/context/AuthContext";

const Stack = createStackNavigator<RootStackParamList>();

// Separate component to use the hook
function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {!isAuthenticated ? (
          //change auth to only apply to profile and my scan screens
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : ( */}
        <Stack.Screen name="App" component={AppNavigator} />
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
