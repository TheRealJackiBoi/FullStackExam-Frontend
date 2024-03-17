import { P, H1, H2 } from "@/components/Typography"
import { buttonVariants } from "@/components/ui/button"
import { GET_COMPANY_BY_ID } from "@/graphql/company/companyQueries"
import { useQuery } from "@apollo/client"
import { Link, useParams } from "react-router-dom"
import { FaCalendarDay } from "react-icons/fa6"

import { Company } from "@/types/companyTypes"
import { Service } from "@/types/serviceTypes"
import ServiceCard from "@/components/ServiceCard"

//test route /company/65f2e44f45a53b3aaf8a0b31

interface CompanyData {
  company: Company // Define the structure of the data returned by the query
}

const CompanyHomePage = () => {
  const { id } = useParams<{ id: string }>()

  const { data, loading, error } = useQuery<CompanyData>(GET_COMPANY_BY_ID, {
    variables: { id: id },
  })

  if (loading) {
    return <H1 text="Loading Company"></H1>
  }

  if (error) {
    return <H1 text="No Company found"></H1>
  }

  const company: Company = data!.company

  return (
    <>
      <Rendere company={company} />
    </>
  )
}

function Rendere({ company }: CompanyData) {
  return (
    <>
      <div>
        <div>
          <div className="flex flex-col h-48">
            <div className="flex-1 bg-gray-200"></div>
            <div className="relative">
              <div className="absolute bottom-0 left-0 mx-12 my-4">
                <H1 text={company.name}></H1>
              </div>
            </div>
          </div>
          <div className="flex justify-between mx-12 my-2">
            <div>
              {company.openForBooking ? (
                <P text={"Open"} />
              ) : (
                <P text="Closed" />
              )}
            </div>
            <div>
              <P
                text={
                  company.address.street +
                  " " +
                  company.address.houseNumber +
                  ", " +
                  company.address.zipCode
                }
              ></P>
            </div>
          </div>
          <hr className="border-t-2 border-gray-300 mt-2" />
        </div>
        <div className="mx-12 my-2">
          <P text={company.description}></P>
        </div>

        <div className="mx-12 my-2">
          <Link className={buttonVariants()} to={"company/:id/booking"}>
            <FaCalendarDay />
            Book tid{" "}
          </Link>
        </div>
        <div className="mx-12 my-3">
          <div className="flex space-x-4">
            <div>
              <H2 text="Services"></H2>
              <div className="min-w-fit mt-2 flex space-x-3">
                {company.services.map((service: Service) => (
                  <ServiceCard service={service} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompanyHomePage
