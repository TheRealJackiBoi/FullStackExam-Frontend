import { useForm } from "react-hook-form"
import { H2 } from "./Typography"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { companyDescriptionSchema } from "@/schema/companyDescription"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Company } from "@/types/companyTypes"
import { useMutation } from "@apollo/client"
import { updateCompanyByID } from "@/graphql/company/companyMutation"
import { GET_COMPANY } from "@/graphql/companyQueries"
import { useToast } from "./ui/use-toast"

const DescriptionForm = ({
  company,
  token,
}: {
  company: Company
  token: string
}) => {
  const { toast } = useToast()
  const [updateCompany] = useMutation(updateCompanyByID, {
    refetchQueries: [GET_COMPANY],
  })

  const form = useForm<z.infer<typeof companyDescriptionSchema>>({
    resolver: zodResolver(companyDescriptionSchema),
    defaultValues: {
      description: company.description || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof companyDescriptionSchema>) => {
    await updateCompany({
      variables: {
        id: company._id,
        houseNumber: company.address.houseNumber,
        streetName: company.address.street,
        zipCode: company.address.zipCode,
        name: company.name,
        token: token,
        description: values.description,
      },
    })
      .then(() => {
        toast({
          title: "Opdateret Beskrivelse",
          description: "Beskrivelsen for virksomheden er blevet opdateret",
        })
        form.reset()
      })
      .catch((error: Error) => {
        toast({
          variant: "destructive",
          title: "fejl",
          description: "kunne ikke opdatere beskrivelsen, prøv igen senere",
        })
        console.log(error)
      })
  }

  return (
    <>
      <H2 text="Beskrivelse" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"secondary"}
            className="mt-4 bg-blue-500 text-white hover:bg-blue-300"
          >
            Opdater
          </Button>
        </form>
      </Form>
    </>
  )
}

export default DescriptionForm
