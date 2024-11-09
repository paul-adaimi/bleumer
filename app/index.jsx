import { Redirect } from "expo-router";
import { useAuth } from "@/components/AuthProvider";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://ae163507f254b1908acad4edb47f4f61@o4508269603979264.ingest.de.sentry.io/4508269606994000",
  debug: true,
});

function Index() {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    return <Redirect href={"home"} />;
  }
  return <Redirect href={"firebaseauth"} />;
}

export default Sentry.wrap(Index);
