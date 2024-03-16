// main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider.tsx"
import CompanyAdminPage from "./pages/CompanyAdminPage.tsx"
import Signup from "./pages/Signup"
import Login from "@/pages/Login.tsx"
import { AuthProvider } from "@/util/AuthContext.tsx"
import { H1 } from "./components/Typography.tsx"
import { ProtectedRoute } from "@/util/ProtectedRoutes.tsx" // Import ProtectedRouteProps
import { User } from "@/types/usertypes.ts" // Import User and ParamsType types
import { RouteParams } from "@/types/router.ts" // Import RouteParams type

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<H1 text="Hello" />} />
      <Route path="company">
        <Route path=":id" element={<div>Company ID</div>} />
        <Route
          path=":id/admin"
          element={
            <ProtectedRoute
              element={<CompanyAdminPage />}
              authChecks={[
                (user: User, params: RouteParams) =>
                  user && user.company?._id === params.id,
                (user: User) => user && user.role === "ADMIN",
              ]}
            />
          }
        />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>
)
