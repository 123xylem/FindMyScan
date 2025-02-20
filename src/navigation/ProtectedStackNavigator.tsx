import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "../screens/auth/ProfileScreen";
import { MyScansList } from "../screens/scans/MyScansList";
import type { ProtectedStackParamList } from "../types/navigation";

const ProtectedStack = createNativeStackNavigator<ProtectedStackParamList>();

export const ProtectedStackNavigator = () => (
  <ProtectedStack.Navigator>
    <ProtectedStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ title: "My Profile" }}
    />
    <ProtectedStack.Screen
      name="MyScansList"
      component={MyScansList}
      options={{ title: "My Scans" }}
    />
  </ProtectedStack.Navigator>
);
