"use client";

import AuthContextProvider from "@/hooks/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
