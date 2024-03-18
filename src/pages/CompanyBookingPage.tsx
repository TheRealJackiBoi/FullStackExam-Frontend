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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Service } from "@/types/serviceTypes"
import { useToast } from "@/components/ui/use-toast"

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
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedService, setSelectedService] = useState<Service | undefined>(
    undefined
  )

  const forminput = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      enhed: "",
    },
  })

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    //await postBooking({variables: values}).then((res) => {
    
    if(selectedService === undefined){
      toast({
        variant: "destructive",
        title: "vælg service",
        description: "Vælg venligst en service",
      }) 
    } else if(date === undefined){
      toast({
        variant: "destructive",
        title: "Vælg dato",
        description: "Vælg indleveringsdato",
      })
    }
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
        <Card className="p-4 flex justify-center items-center">
          <CardContent>
            <div className="w-full md:w-72 ">
              <Form {...forminput}>
                <form
                  onSubmit={forminput.handleSubmit(onSubmit)}
                  className="flex flex-col"
                >
                  <FormField
                    control={forminput.control}
                    name="enhed"
                    render={({ field }) => (
                      <FormItem className="flex flex-col mb-4">
                        <FormLabel className="mr-2">Enhed</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {selectedService ? (
                        <Button variant="outline">
                          {selectedService.name}
                        </Button>
                      ) : (
                        <Button variant="outline">vælg service</Button>
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full md:w-72">
                      <DropdownMenuLabel>services</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={
                          selectedService ? JSON.stringify(selectedService) : ""
                        }
                        onValueChange={(value: string) => {
                          const parsedService = JSON.parse(value) as Service
                          setSelectedService(parsedService)
                        }}
                      >
                        {company.services?.map((service: Service) => (
                          <DropdownMenuRadioItem
                            key={service._id}
                            value={JSON.stringify(service)}
                          >
                            {service.name}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {selectedService?.estimatedPrice ? (
                    <div className="text-center mt-4">
                      <H3 text={selectedService?.estimatedPrice + " kr."}></H3>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="text-center">
                    <Button
                      type="submit"
                      className=" bg-blue-500 text-white hover:bg-blue-300 my-5"
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
