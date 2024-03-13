import { Link } from "react-router-dom"
import { Button, buttonVariants } from "./ui/button"
import { Input } from "@/components/ui/input"
import logo from "@/assets/logo.png"

const NavBar = () => {
  return (
    <nav className=" w-screen flex p-2 justify-between">
      <div className="flex justify-between gap-2">
        <Link to="/hjem">
          <img src={logo} alt="logo" className="h-10 w-10 invert" />
        </Link>
        <Button variant="outline" size="icon">
          icon  
        </Button> 
      </div>

      <Input type="text" placeholder="Søg" className=" w-2/5 sm:w-2/5 md:w-2/5 lg:w-1/5 rounded-full " />

      <div className="flex gap-2">
        <Link to="/logind" className={buttonVariants({ variant: "ghost"})}> Log ind</Link>
        <Link to="/tilmed" className={buttonVariants()}>Tilmeld</Link>
      </div>
    </nav>
  )
}

export default NavBar
