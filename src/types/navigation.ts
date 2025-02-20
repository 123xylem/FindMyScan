import type { RouteProp } from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import type { ScanCenter } from "./models";

// Main app tabs
export type AppStackParamList = {
  Grid: undefined;
  Map: undefined;
  ProfileTab: undefined;
  ScanCenterDetails: { centerId: string } | { center: ScanCenter };
  MyScansList: undefined;
};

// Profile stack screens
export type ProfileStackParamList = {
  Profile: undefined;
  Login: { returnTo?: string };
  Register: { returnTo?: string };
  MyScansList: undefined;
  UploadScan: undefined;
  ScanCenterDetails: { centerId: string };
};

// Screen props for each stack
export type AppScreenProps<T extends keyof AppStackParamList> = {
  navigation: NativeStackNavigationProp<AppStackParamList, T>;
  route: RouteProp<AppStackParamList, T>;
};

export type ProfileScreenProps<T extends keyof ProfileStackParamList> =
  NativeStackScreenProps<ProfileStackParamList, T>;
