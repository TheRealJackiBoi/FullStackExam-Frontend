import { H1, H3 } from "@/components/Typography"
import { GET_COMPANY_BY_ID } from "@/graphql/company/companyQueries"
import { Company } from "@/types/companyTypes"
import { useQuery } from "@apollo/client"
import { Link, useParams } from "react-router-dom"
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
import { Button, buttonVariants } from "@/components/ui/button"

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
      <div className="absolute ">
        <Link
          className={buttonVariants({ variant: "destructive" })}
          to={`/company/${company._id}`}
        >
          <span className="text-sm md:text-base">Tilbage</span>
        </Link>
      </div>
      <div className="m-4 flex justify-center">
        <H1 text={"Book en service hos " + company.name}></H1>
      </div>
      <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-10">
        <Card className="p-4">
          <CardContent>
            <div className="text-center">
              <H3 text="Vælg indleveringsdato"></H3>
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </div>
          </CardContent>
        </Card>
        <Card className="p-4">
          <CardContent>
            <div className="w-full md:w-72 col">
              <Form {...forminput}>
                <form onSubmit={forminput.handleSubmit(onSubmit)}>
                  <FormField
                    control={forminput.control}
                    name="enhed"
                    render={({ field }) => (
                      <FormItem className="flex items-center mb-4">
                        <FormLabel className="mr-2">Enhed</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    name="service"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel className="mr-2">Service</FormLabel>
                            <FormControl>
                                <Input {...field } />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                  />
                    
                  <div className="text-center scale-125">
                    <Button
                      type="submit"
                      className=" bg-blue-500 text-white hover:bg-blue-300"
                    >
                      Bestil
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
