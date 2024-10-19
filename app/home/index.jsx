import { Redirect } from "expo-router";
import { useAuth } from "@/components/AuthProvider";

export default function Index() {
  const { currentUser } = useAuth();
  if (!currentUser.displayName) {
    return <Redirect href={"/home/enterName"} />;
  }
  return <Redirect href={"/home/home"} />;
}
