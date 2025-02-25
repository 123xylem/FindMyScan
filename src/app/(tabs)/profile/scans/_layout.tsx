import { Stack } from "expo-router";

export default function ScanLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "My Scans",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="upload"
        options={{
          title: "Upload Scan",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
