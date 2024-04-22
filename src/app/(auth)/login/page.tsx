"use client";
import { auth } from "@/firebase/config";
import { useAuth } from "@/hooks/auth-context";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, update } from "firebase/database";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const provider = new GoogleAuthProvider();

export default function Login() {
  const firebaseAuth = auth;
  const router = useRouter();
  const authContext = useAuth();

  useEffect(() => {
    if (authContext?.user || firebaseAuth.currentUser) {
      router.push("/");
    }
  }, []);

  const handleSignIn = () => {
    return signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) return;
        const { user } = result;
        const database = getDatabase();
        const newData = {
          name: user.displayName,
          email: user.email,
        };
        //create users data
        let updates: any = {};
        updates[`/users/${user.uid}`] = newData;
        update(ref(database), updates);
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <button onClick={handleSignIn}>Login</button>
      <h1>Login page</h1>
    </>
  );
}
