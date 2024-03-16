import { useForm } from "react-hook-form"
import { H2 } from "./Typography"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { companyDescriptionSchema } from "@/schema/companyDescription"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Company } from "@/types/companyTypes"

const DescriptionForm = ({ company }: { company: Company }) => {
  const form = useForm<z.infer<typeof companyDescriptionSchema>>({
    resolver: zodResolver(companyDescriptionSchema),
    defaultValues: {
      description: company.description || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof companyDescriptionSchema>) => {
    console.log(values)
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
