import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../hooks/useAuth";

export default function AuthRoutesLayout() {
  const { userId } = useAuth();

  if (userId) return <Redirect href={"/"} />;

  return <Stack screenOptions={{ headerShown: false }} />;
}