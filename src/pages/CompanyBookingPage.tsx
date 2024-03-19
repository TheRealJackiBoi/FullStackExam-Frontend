import { H1, H3 } from "@/components/Typography"
import { GET_COMPANY_BY_ID } from "@/graphql/company/companyQueries"
import { Company } from "@/types/companyTypes"
import { useMutation, useQuery } from "@apollo/client"
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
import { CREATE_BOOKING } from "@/graphql/booking/bookingMutations"
import facade from "@/util/authFacade"

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

  const [ createBooking ] = useMutation(CREATE_BOOKING)

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      enhed: "",
      model: "",
      brand: "",
      date: new Date(),
    },
  })

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    if (selectedService === undefined) {
      toast({
        variant: "destructive",
        title: "vælg service",
        description: "Vælg venligst en service",
      })
      return
    }
    
    //end time tid skal sætte til : start tid + estimatedTime på service
    const estimatedTimeInMilliseconds = selectedService?.estimatedTime ?? 0
    // Convert date to milliseconds
    const dateInMilliseconds = values.date.getTime()
    // Add the two durations together
    const combinedTimeInMilliseconds =
      dateInMilliseconds + estimatedTimeInMilliseconds
    // Create a new Date object from the combined time
    const calculatedEndTime = new Date(combinedTimeInMilliseconds)

    await createBooking({
      variables: {
        startTime: values.date,
        endTime: calculatedEndTime,
        status: "ONGOING",
        device: values.enhed,
        /* {
          enhed: values.enhed,
          model: values.model,
          brand: values.brand,
        } */
        cost: selectedService!.estimatedPrice,
        serviceId: selectedService!._id,
        companyId: company._id,
        userId: facade.getIdFromToken(),
        token: facade.getToken(),
      },
    }).then(() => {
      toast({
        title: "Service booket",
        description: `${selectedService.name} er nu booket for ${values.enhed}: ${values.model}`,
      })
      form.reset()
    }).catch((error: Error) => {
      toast({
        variant: "destructive",
        title: "Fejl",
        description: `Kunne ikke oprette booking med ${selectedService.name} for ${values.enhed}, prøv igen senere`,
      })
      console.log(error)
    })
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
      <div className="flex justify-center p-6">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap justify-center">
            <Card className="p-4 lg:mr-4">
              <CardContent>
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <div className="text-center ">
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
            <Card className="p-6 flex justify-center items-center lg:w-fit w-full lg:ml-4 ">
              <CardContent>
                <div className="w-full md:w-72 ">
                  <FormField
                    control={form.control}
                    name="enhed"
                    render={({ field }) => (
                      <FormItem className="flex flex-col mb-4">
                        <FormLabel className="mr-2">Enhedens type</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem className="flex flex-col mb-4">
                        <FormLabel className="mr-2">Enhedens mærke</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem className="flex flex-col mb-4">
                        <FormLabel className="mr-2">Model</FormLabel>
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
                            selectedService
                              ? JSON.stringify(selectedService)
                              : ""
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
                      <H3 text={"Estimeret pris: " + selectedService?.estimatedPrice + "  kr."}></H3>
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
