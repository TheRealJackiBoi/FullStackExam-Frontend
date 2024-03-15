import MainLayout from "./pages/MainLayout"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}

export default App
