import { User, LoginData } from "./usertypes"

export interface AuthContextType {
  user: User | null
  login: (userData: LoginData) => void
  logout: () => void
}
