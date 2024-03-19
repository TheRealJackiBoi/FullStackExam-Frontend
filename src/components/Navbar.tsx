import { Link, createSearchParams } from "react-router-dom"
import { Button, buttonVariants } from "./ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import logo from "@/assets/logo.svg"
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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ThemeProvider, useTheme } from "./theme-provider"

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
          <Avatar>
            <AvatarImage src={logo} className="h-10 w-10 scale-150 dark:invert" />
            <AvatarFallback>LOGO</AvatarFallback>
          </Avatar>
        </Link>
        <Button variant="outline" size="icon">
          <FaCompass />
        </Button>
        <ModeToggle />
      </div>
      <Form {...form}>
        <form className="space-y-2 columns-1">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Søg"
                    className=" rounded-full"
                    onKeyUp={(event) => {
                      if (event.key === "Enter") {
                        navigate({
                          pathname: "search",
                          search: `?query=${createSearchParams({
                            query: event.currentTarget.value,
                          })}`,
                        })
                      }
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
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
