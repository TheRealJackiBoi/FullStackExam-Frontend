import { Link, createSearchParams } from "react-router-dom"
import { Button, buttonVariants } from "./ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import logo from "@/assets/logo.png"
import { ModeToggle } from "./ui/mode-toggle"
import { FaCompass } from "react-icons/fa6"
import useAuth from "@/util/AuthContext"
import { searchSchema } from "@/schema/searchSchema"
import { useNavigate } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const NavBar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  })

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
        className="w-2/5 sm:w-2/5 md:w-2/5 lg:w-1/5 rounded-full "
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            navigate({
              pathname: "/search",
              search: `?search=${event.currentTarget.value}`,
            })
          }
        }}
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
