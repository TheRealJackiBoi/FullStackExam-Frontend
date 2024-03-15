import { Link } from "react-router-dom"
import { Button, buttonVariants } from "./ui/button"
import { Input } from "@/components/ui/input"
import logo from "@/assets/logo.png"
import { ModeToggle } from "./ui/mode-toggle";
import { FaCompass } from "react-icons/fa6"
import useAuth from "@/util/AuthContext"

const NavBar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className=" w-screen flex p-2 justify-between">
      <div className="flex justify-between gap-2">
        <Link to="/">
          <img src={logo} alt="logo" className="h-10 w-10 invert" />
        </Link>
        <Button variant="outline" size="icon">
          <FaCompass />  
        </Button> 
        <ModeToggle />
      </div>

      <Input
        type="text"
        placeholder="Søg"
        className=" w-2/5 sm:w-2/5 md:w-2/5 lg:w-1/5 rounded-full "
      />

      
      <div className="flex gap-2">
        {(user && (
          <Button variant="outline" onClick={logout}>
            Log ud
          </Button>
        )) || (
          <>
            <Link to="/login" className={buttonVariants({ variant: "ghost" })}>
              {" "}
              Log ind
            </Link>
            <Link to="/signup" className={buttonVariants()}>
              Tilmeld
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
