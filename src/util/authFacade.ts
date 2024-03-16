import Cookies from "js-cookie"
import { User } from "@/types/usertypes"
function facade() {
  const setToken = (token: string) => {
    // save as cookie
    Cookies.set("token", token, { expires: 7, secure: true })
  }

  const getToken = () => {
    return Cookies.get("token")
  }

  const getIdFromToken = () => {
    const token = getToken()
    if (token) {
      const payload = token.split(".")[1]
      const decoded = atob(payload)
      const parsed = JSON.parse(decoded)
      return parsed.id
    }
    return null
  }

  const setUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user))
  }

  const logout = () => {
    Cookies.remove("token")
    localStorage.removeItem("user")
  }

  const getUser = () => {
    const userString = localStorage.getItem("user")
    if (userString) {
      return JSON.parse(userString) as User
    }
    return null
  }

  return {
    setToken,
    getToken,
    getIdFromToken,
    setUser,
    logout,
    getUser,
  }
}

export default facade()
