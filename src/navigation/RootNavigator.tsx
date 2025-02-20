import { useAuth } from "../context/AuthContext";
import { AppNavigator } from "./AppNavigator";
import { AuthNavigator } from "./AuthNavigator";

export const RootNavigator = () => {
  const { isAuthenticated, user } = useAuth();
  console.log("RootNavigator auth state:", { isAuthenticated, user });

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};
