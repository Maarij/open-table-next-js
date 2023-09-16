"use client";

import React, {useState, createContext, useEffect} from "react";
import useAuth from "@/hooks/useAuth";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}

interface AuthState extends State {
  setAuthState:  React.Dispatch<React.SetStateAction<State>>
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  error: null,
  data: null,
  setAuthState: () => {}
});

export default function AuthContext({
  children
}: {
  children: React.ReactNode
}) {
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null
  });

  const {fetchUser} = useAuth();

  useEffect(() => {
    fetchUser()
  }, []);

  return (
    <AuthenticationContext.Provider value={{
      ...authState,
      setAuthState
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}
