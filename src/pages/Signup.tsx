import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { userCreationSchema } from "@/schema/signup"
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
import { CREATE_USER } from "@/graphql/authQueries"
import { useMutation } from "@apollo/client"

function Signup() {
  const [createUser] = useMutation(CREATE_USER)

  const form = useForm({
    resolver: zodResolver(userCreationSchema),
    defaultValues: {
      email: "",
      password: "",
      user: {
        firstName: "",
        lastName: "",
        role: "USER",
        zipCode: "",
        street: "",
        city: "",
      },
    },
  })

  function onSubmit(values: z.infer<typeof userCreationSchema>) {
    createUser({
      variables: {
        email: values.email,
        password: values.password,
        user: {
          firstName: values.user.firstName,
          lastName: values.user.lastName,
          role: values.user.role, // Use the role value from the form data
          zipCode: values.user.zipCode,
          street: values.user.street,
          city: values.user.city,
        },
      },
    })

    form.reset()
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fornavn</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Efternavn</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="user.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postnummer</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gade</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="user.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>By</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Opret</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default Signup
