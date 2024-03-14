import NavBar from "@/components/Navbar";
import { ReactNode } from "react";


const MainLayout = ({ children }: { children: ReactNode}) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

export default MainLayout;