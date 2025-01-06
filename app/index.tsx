import {Redirect} from "expo-router";
import {useAuthContext} from "@/contexts/AuthContext";

export default function Index() {
  const { authState, loading } = useAuthContext();

  return loading? <Redirect href={'/home/loginStall'} /> : authState?.authenticated ? <Redirect href="/home" /> : <Redirect href="/auth/login" />;
}

