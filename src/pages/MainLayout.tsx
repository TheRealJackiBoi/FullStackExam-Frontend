import NavBar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import { ReactNode } from "react"

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4">{children}</div>
      <Toaster />
    </>
  )
}

export default MainLayout
