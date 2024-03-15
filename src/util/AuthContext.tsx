import { ReactNode, createContext, useContext, useState } from "react"
import facade from "@/util/authFacade"
import { LoginData } from "@/types/usertypes"
import { AuthContextType } from "@/types/authTypes"

const AuthContext = createContext<AuthContextType | null>(null) // Nullable context

const AuthProvider = ({ children }: { children: ReactNode }) => {
  let init = facade.getUser()
  const [user, setUser] = useState(init)

  const login = (userData: LoginData) => {
    facade.setToken(userData.token)
    facade.setUser(userData.user)
    setUser(userData.user)
  }

  const logout = () => {
    setUser(null)
    facade.logout()
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextType => {
  const contextValue = useContext(AuthContext)
  if (!contextValue) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return contextValue
}

export { AuthProvider, useAuth as default }
