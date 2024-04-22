"use client";
import { auth } from "@/firebase/config";
import { User, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

interface Auth {
  user: User | undefined | null;
  loading: boolean;
  error: Error | undefined;
  signout: () => void;
}

const defaultValue: Auth = {
  user: null,
  loading: true,
  error: undefined,
  signout: () => {},
};

const AuthContext = createContext<Auth>(defaultValue);
export const useAuth = () => useContext<Auth>(AuthContext);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if ((!user && !loading) || error) {
      router.push("/login");
    }
  }, [user, loading]);

  const handleSignout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, signout: handleSignout }}
    >
      {loading ? <></> : children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
