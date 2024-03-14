import ServiceCard from "./components/ServiceCard"
import { H1 } from "./components/Typography"
import MainLayout from "./pages/MainLayout"

function App() {
  return (
    <MainLayout>
      <H1 text="Hello World!" />
      <ServiceCard
        service={{
          name: "Service",
          estimatedTime: 3600,
          estimatedPrice: 2000,
          imageUrl: "https://via.placeholder.com/150",
        }}
      />
    </MainLayout>
  )
}

export default App
