import { H1, H3 } from "@/components/Typography"
import { GET_COMPANY_BY_ID } from "@/graphql/company/companyQueries"
import { Company } from "@/types/companyTypes"
import { useQuery } from "@apollo/client"
import { Link, useParams } from "react-router-dom"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
  const [selectedService, setSelectedService] = useState<Service | undefined>(
    undefined
  )

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      enhed: "",
      date: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    //await postBooking({variables: values}).then((res) => {

    if (selectedService === undefined) {
      toast({
        variant: "destructive",
        title: "vælg service",
        description: "Vælg venligst en service",
      })
    }

    //end time tid skal sætte til : start tid + estimatedTime på service

    console.log(values)
    //})
  }

  // get service
  // sæt start tiden
  // side om side på stor skærm
  // padding 

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
      <div className="flex justify-center p-6 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex  "
          >
            <Card className="p-4 mr-4">
              <CardContent>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <div className="text-center">
                      <FormItem>
                        <FormLabel> Vælg indleveringsdato</FormLabel>
                        <FormControl>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                      <FormMessage />
                    </div>
                  )}
                />
              </CardContent>
            </Card>
            <Card className="p-6 flex justify-center items-center ml-4">
              <CardContent>
                <div className="w-full md:w-72 ">
                  <FormField
                    control={form.control}
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
                  <div className="flex justify-center">
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
                  </div>

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
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </>
  )
}
