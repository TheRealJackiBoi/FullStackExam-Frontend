import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { z } from "zod"
import { adminCreationSchema } from "@/schema/admin"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@apollo/client"
import { CREATE_COMPANY_ADMIN } from "@/graphql/company/companyMutation"
import { GET_COMPANY_BY_ID } from "@/graphql/company/companyQueries"
import { Input } from "../ui/input"
import { useToast } from "../ui/use-toast"
import { error } from "console"

const CreateAdminModal = ({
  companyId,
  token,
}: {
  companyId: string
  token: string
}) => {
  const { toast } = useToast()

  const [createCompanyAdmin] = useMutation(CREATE_COMPANY_ADMIN, {
    refetchQueries: [GET_COMPANY_BY_ID],
  })

  const form = useForm<z.infer<typeof adminCreationSchema>>({
    resolver: zodResolver(adminCreationSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "COMPANYADMIN",
      street: "",
      houseNumber: "",
      zipCode: "",
      token: token,
      companyId: companyId,
    },
  })

  const onSubmit = async (values: z.infer<typeof adminCreationSchema>) => {
    await createCompanyAdmin({
      variables: {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
        street: values.street,
        houseNumber: parseInt(values.houseNumber),
        zipCode: parseInt(values.zipCode),
        token: values.token,
        companyId: values.companyId,
      },
    })
      .then(() => {
        toast({
          title: "Admin tilføjet",
          description: `${values.email} er nu tilføjet som admin`,
        })
        form.reset()
      })
      .catch((error: Error) => {
        toast({
          variant: "destructive",
          title: "Fejl",
          description: `Kunne ikke oprette admin med emailen ${values.email}, prøv igen senere`,
        })
        console.log(error)
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className=" bg-blue-500 text-white hover:bg-blue-300"
        >
          Tilføj admin
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tilføj admin</DialogTitle>
          <DialogDescription>
            Tiløj en administator til virksomheden, som har adgang til cases og
            services.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
              name="firstName"
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
              name="lastName"
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
              name="street"
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
              name="houseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Husnummer</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postnummer</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  variant={"secondary"}
                  className="mt-2 bg-blue-500 text-white hover:bg-blue-300"
                >
                  Tilføj
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateAdminModal
