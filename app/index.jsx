import { Redirect } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function Index() {
  return (
    <>
      <SignedIn>
        <Redirect href={"home"} />
      </SignedIn>
      <SignedOut>
        <Redirect href={"firebaseauth"} />
      </SignedOut>
    </>
  );
}
