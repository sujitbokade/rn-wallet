import { Redirect } from "expo-router";
import { Stack } from "expo-router/stack";
import { useAuth } from "../../hooks/useAuth";

export default function Layout() {
  const { userId } = useAuth()

  // if (!isLoaded) return null; // this is for a better ux

  if (!userId) return <Redirect href={"/sign-in"} />;

  return <Stack screenOptions={{ headerShown: false }} />;
}