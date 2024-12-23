import { Redirect } from "expo-router";
import { useAuth } from "@/components/AuthProvider";

function Index() {
  // const { isSignedIn } = useAuth();
  // if (isSignedIn) {
  return <Redirect href={"home"} />;
  // }
  // return <Redirect href={"firebaseauth"} />;
}

export default Index;
