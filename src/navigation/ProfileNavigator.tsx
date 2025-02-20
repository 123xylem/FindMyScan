import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileStackParamList } from "../types";
import { ProfileScreen, LoginScreen, RegisterScreen } from "../screens/auth";
import { MyScansList } from "../screens/scans/MyScansList";
import { UploadScan } from "../screens/scans/UploadScan";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ presentation: "modal" }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ presentation: "modal" }}
    />
    <Stack.Screen name="MyScansList" component={MyScansList} />
    <Stack.Screen
      name="UploadScan"
      component={UploadScan}
      options={{ title: "Upload Scan" }}
    />
  </Stack.Navigator>
);
