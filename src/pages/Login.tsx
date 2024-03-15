import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { loginSchema } from "@/schema/login"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { LOGIN_USER } from "@/graphql/authQueries"
import { useLazyQuery } from "@apollo/client"
import { useToast } from "@/components/ui/use-toast"
import { LoginResponse } from "@/types/usertypes"
import useAuth from "@/util/authFacade"
import { useNavigate } from "react-router-dom"

function Login() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [getuser] = useLazyQuery<LoginResponse>(LOGIN_USER)
  const { login: loginUser } = useAuth()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await getuser({ variables: values }).then((res) => {
      const { login } = res.data ?? {}
      if (login?.token) {
        const { user } = login
        const { firstName, lastName } = user
        loginUser({ ...login }) // ayy angular workshop
        toast({
          title: `Velkommen ${firstName} ${lastName}`,
          description: "Du er nu logget ind",
        })
        navigate("/")
      } else {
        toast({
          variant: "destructive",
          title: "Fejl",
          description: "Forkert email eller adgangskode",
        })
      }
    })
  }

  return (
    <Card className="w-6/12 mx-auto mt-10 pt-6">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 columns-1"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adgangskode</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Login</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default Login
