import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Api, useApi } from "./Api";
import { User } from "../models/users";
import { RequestError } from "./ApiService";

export interface AuthService {
  login(username: string, password: string): Promise<void>;
  register(username: string, password: string): Promise<void>;
  logout(): Promise<void>;
}

export type AuthContextType = {
  auth: AuthService;
  user: User | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (auth == null) {
    throw new Error("no auth");
  }

  return auth;
};

class AuthServiceImpl implements AuthService {
  api: Api;
  setUser: (user: User) => void;

  constructor(api: Api, setUser: (user: User) => void) {
    this.api = api;
    this.setUser = setUser;
  }

  async login(username: string, password: string): Promise<void> {
    const resp = await this.api.login(username, password);
    // TODO: show notification on error
    if (resp.data != null) {
      this.setUser(resp.data);
    }
  }

  async register(username: string, password: string): Promise<void> {
    const resp = await this.api.register(username, password);
    // TODO: show notification on error
    if (resp.data != null) {
      this.setUser(resp.data);
    }
  }

  async logout(): Promise<void> {
    return await this.api.logout();
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const api = useApi();
  const [user, setUser] = useState<User | null>(null);

  const authService = useMemo(() => new AuthServiceImpl(api, setUser), [api]);

  const authContext: AuthContextType = {
    auth: authService,
    user,
  };

  // Initialize user.
  useEffect(() => {
    api
      .getUser()
      .then((resp) => {
        setUser(resp.data);
      })
      .catch((err) => {
        if (err instanceof RequestError && err.status === 401) {
          // User is not authenticated.
          setUser(null);
        } else {
          throw err;
        }
      });
  }, [api]);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};
