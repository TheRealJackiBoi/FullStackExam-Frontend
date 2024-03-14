import { H1 } from "./components/Typography"
import CompanyHomePage from "./pages/CompanyHomePage"
import MainLayout from "./pages/MainLayout"

function App() {
  return (
      <MainLayout>
      <H1 text="Hello World!" />
      <CompanyHomePage companyId={"65f2e44f45a53b3aaf8a0b31"} />
      </MainLayout>
  )
}

export default App
