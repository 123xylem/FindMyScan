import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { getUserProfile, signOut } from "../services/auth";
import type { User, Session } from "@supabase/supabase-js";
import type { UserProfile } from "../types";
import { useNavigation } from "@react-navigation/native";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Get current session
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("Initial session:", session);
        setIsAuthenticated(!!session);

        if (session?.user) {
          const profile = await getUserProfile(session.user.id);
          console.log("Got profile:", profile);
          if (profile) setUser(profile);
        }
      } catch (error) {
        console.error("Auth init error:", error);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event: string, session: Session | null) => {
        console.log(
          "Auth state changed:",
          { _event, session },
          isAuthenticated
        );
        setIsAuthenticated(!!session);

        if (session?.user) {
          const profile = await getUserProfile(session.user.id);
          if (profile) setUser(profile);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
      // Reset navigation stack
      navigation.reset({
        index: 0,
        routes: [{ name: "Profile" }],
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { user, isAuthenticated, setIsAuthenticated, logout };
};
