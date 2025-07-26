import { Slot } from "expo-router";
import SafeScreen from "@/components/SafeScreen";
import { AuthProvider } from "@/hooks/useAuth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </AuthProvider>
  );
}
