import {Redirect} from "expo-router";
import {useAuthContext} from "@/contexts/AuthContext";

export default function Index() {
  const { authState } = useAuthContext();

  return authState?.authenticated ? <Redirect href="/home" /> : <Redirect href="/auth/login" />;
}

