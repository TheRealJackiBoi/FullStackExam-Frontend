import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { serviceSchema } from "@/schema/service"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { useMutation } from "@apollo/client"
import { CREATE_SERVICE } from "@/graphql/service/serviceMutations"
import { useToast } from "./ui/use-toast"
import { GET_COMPANY } from "@/graphql/companyQueries"

const CreateServiceModal = ({ companyId, token }: { companyId: string, token: string }) => {
  const [createService] = useMutation(CREATE_SERVICE, {
    refetchQueries: [GET_COMPANY],
  })  
  const { toast } = useToast()

  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      estimatedPrice: "",
      imageUrl: "",
      estimatedTime: "",
    },
  })

  const onSubmit = async(values: z.infer<typeof serviceSchema>) => {
    await createService({
      variables: {
        name: values.name,
        estimatedTime: parseInt(values.estimatedTime),
        estimatedPrice: parseFloat(values.estimatedPrice),
        imageUrl: values.imageUrl,
        companyId: companyId,
        token: token,
      },
    })
    .then(() => {
      toast({
        title: "service tilføjet",
        description: "service er nu tilføjet til virksomheden",
      })
      form.reset()
    })
    .catch((error: Error) => {
      toast({
        variant: "destructive",
        title: "fejl",
        description: "kunne ikke lave service, prøv igen senere",
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
          Tilføj service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <DialogHeader>
          <DialogTitle>Tilføj service</DialogTitle>
          <DialogDescription>
            Tilføj en service til virksomheden
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Navn</FormLabel>
                  <FormControl>
                    <Input placeholder="Navn" {...field} />
                  </FormControl>
                  <FormDescription>
                    Navnet på den service du vil tilføje
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimatedPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimeret Pris</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Den estimerede pris for service
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billede url</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Billede url" {...field} />
                  </FormControl>
                  <FormDescription>
                    Url til et billede af service
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimatedTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimeret tid</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Den estimerede tid for service
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                variant={"secondary"}
                className=" bg-blue-500 text-white hover:bg-blue-300"
              >
                Tilføj
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default CreateServiceModal
