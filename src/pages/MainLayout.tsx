import NavBar from "@/components/Navbar";


const MainLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

export default MainLayout;