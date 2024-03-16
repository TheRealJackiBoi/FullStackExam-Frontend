export interface ProtectedRouteProps<User, RouteParams> {
  element: React.ReactNode
  authChecks: Array<(user: User, params: RouteParams) => boolean>
}

export interface RouteParams {
  id: string
}
