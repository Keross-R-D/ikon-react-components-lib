import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext,
} from "react";
import type { User } from "@/types/user";
import { getCookieSession } from "@/utils/session/cookieSession";
import { jwtDecode } from "jwt-decode";
import type { DecodedUserJwtProps } from "@/types/decodedUserJwt";
import { useProfileQuery } from "./api/platformServiceQuery";

interface UserProps extends User {
  primaryAccountId: string;
  activeAccountId: string;
  roles: string[];
  accountName?: string;
}

interface UserContextType {
  user: Partial<UserProps> | null;
  setUser: (user: Partial<UserProps> | null) => void;
  setAccountName: (accountName: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Partial<UserProps> | null>(null);

  // On mount, set user from access token if available
  useEffect(() => {
    const token = getCookieSession("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedUserJwtProps>(token);
        setUser((prev) => ({
          ...prev,
          userId: decoded.sub,
          primaryAccountId: decoded.primaryAccountId,
          activeAccountId: decoded.activeAccountId,
          roles: decoded.platformAccess?.roles ?? [],
        }));
      } catch {
        setUser(null);
      }
    }
  }, []);

  // Merge User data from API with decoded JWT fields
  const userId = user?.userId ?? "";
  const { data, isSuccess } = useProfileQuery(userId);
  useEffect(() => {
    if (isSuccess && data) {
      setUser((prev) => ({
        ...prev,
        ...data,
      }));
    }
  }, [isSuccess, data]);

  const setAccountName = (accountName: string) => {
    setUser((prev) => ({
      ...prev,
      accountName: accountName,
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, setAccountName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
