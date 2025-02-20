import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen } from "../screens/centers/MapScreen";
import { GridScreen } from "../screens/centers/GridScreen";
import { AppStackParamList } from "../types/index";
import { ProfileNavigator } from "./ProfileNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<AppStackParamList>();

export const AppNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "grid-outline";

          if (route.name === "Grid") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          paddingBottom: insets.bottom,
        },
      })}
    >
      <Tab.Screen name="Grid" component={GridScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
};
