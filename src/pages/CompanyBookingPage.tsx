import { H1, H3 } from "@/components/Typography"
import { GET_COMPANY_BY_ID } from "@/graphql/company/companyQueries"
import { Company } from "@/types/companyTypes"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookingSchema } from "@/schema/booking"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CompanyData {
  company: Company
}

export const CompanyBookingPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data, loading, error } = useQuery<CompanyData>(GET_COMPANY_BY_ID, {
    variables: { id: id },
  })

  if (loading) {
    return <H1 text="Loading Company"></H1>
  }

  if (error) {
    return <H1 text="We couldnt find the company and its services"></H1>
  }

  const company: Company = data!.company

  return (
    <>
      <BookingRender company={company} />
    </>
  )
}

function BookingRender({ company }: CompanyData) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const forminput = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      enhed: "",
    },
  })

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    //await postBooking({variables: values}).then((res) => {
    //})
  }

  return (
    <>
      <div className="m-4 flex justify-center">
        <H1 text={"Book en service hos " + company.name}></H1>
      </div>
      <Card>
        <CardContent className="flex space-x-6 items-center ">
          <div>
            <H3 text="vælg indleveringsdato"></H3>
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
          <div className="w-6/12 mx-auto mt-10 pt-6">
            <Form {...forminput}>
              <form
                onSubmit={forminput.handleSubmit(onSubmit)}
                className="flex flex-col"
              >
                <FormField
                  control={forminput.control}
                  name="enhed"
                  render={({ field }) => (
                    <FormItem className="flex items-center mb-4">
                      <FormLabel className="mr-2">Enhed</FormLabel>
                      <FormControl>
                        <Input className="max-w-md" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-center scale-125">
                  <Button type="submit">Bestil</Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
