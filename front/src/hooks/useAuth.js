import { useApp } from "../context/AppContext";
import { login, logout } from "../services/auth";

export const useAuth = () => {
  const { user, setUser } = useApp();

  const signIn = (email) => {
    login(email);
    setUser({ email });
  };

  const signOut = () => {
    logout();
    setUser(null);
  };

  return { user, signIn, signOut };
};
