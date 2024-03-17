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
import CompanyHomePage from "./pages/CompanyHomePage.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx"
import Signup from "./pages/Signup"
import Login from "@/pages/Login.tsx"
import { AuthProvider } from "@/util/AuthContext.tsx"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<App />} />
      <Route path="company/:id" element={<CompanyHomePage />}/>
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
