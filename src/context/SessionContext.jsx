import { createContext, useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionMessage, setSessionMessage] = useState(null);
  const [sessionError, setSessionError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSignUp(email, password, username) {
    setSessionLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, admin: false },
      },
    });
    if (error) setSessionError(error.message);
    else setSessionMessage("Check your email to confirm.");
    setSessionLoading(false);
  }

  async function handleSignIn(email, password) {
    setSessionLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setSessionError(error.message);
    else {
      setSession(data.session);
      setSessionMessage("Login successful.");
    }
    setSessionLoading(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setSession(null);
  }

  return (
    <SessionContext.Provider
      value={{
        session,
        sessionLoading,
        sessionMessage,
        sessionError,
        handleSignUp,
        handleSignIn,
        handleSignOut,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
