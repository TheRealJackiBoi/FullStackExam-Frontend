import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import useAuth from "@/util/AuthContext.tsx"
import { ProtectedRouteProps, RouteParams } from "@/types/router.ts"
import { User } from "@/types/usertypes.ts"
import { useEffect } from "react"

export const ProtectedRoute: React.FC<
  ProtectedRouteProps<User, RouteParams>
> = ({ element, authChecks, ...rest }) => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const params = useParams<{ id?: string }>()

  const checkAuthorization = (): boolean => {
    if (!isAuthenticated()) return false

    const id = params.id as string | undefined

    if (id === undefined) return false

    for (const authCheck of authChecks) {
      if (authCheck(user!, { id })) {
        return true
      }
    }

    return false
  }

  useEffect(() => {
    if (!checkAuthorization()) {
      navigate("/")
    }
  }, [user, params])

  return React.cloneElement(element as React.ReactElement, rest)
}
