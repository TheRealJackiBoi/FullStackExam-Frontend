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
    setUser,
    logout,
    getUser,
  }
}

export default facade()
