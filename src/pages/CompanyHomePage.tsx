import { P, H1, H2 } from "@/components/Typography"
import { buttonVariants } from "@/components/ui/button"
import { getCompanyByID } from "@/graphql/company/companyQueries"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { FaCalendarDay } from "react-icons/fa6"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ICompany } from "@/types/companyTypes"

interface companyProp {
  companyId: string
}

const CompanyHomePage = (props: companyProp) => {
  const { data, loading } = useQuery<ICompany>(getCompanyByID, {
    variables: { id: props.companyId },
  })

  if (loading) {
    return <H1 text="Loading Company"></H1>
  }

  if (!data) {
    return <H1 text="No Company found"></H1>
  }

  return (
    <>
      <div>
        <Rendere specificCompany={data} />
      </div>
    </>
  )
}

function Rendere({ specificCompany: data }: ICompany) {

  return (
    <>
      <div>
        <div>
          <div className="flex flex-col h-48">
            <div className="flex-1 bg-gray-200"></div>
            <div className="relative">
              <div className="absolute bottom-0 left-0 mx-12 my-4">
                <H1 text={data?.company.name}></H1>
              </div>
            </div>
          </div>
          <div className="flex justify-between mx-12 my-2">
            <div>
              {data.company.openForBooking ? (
                <P text={"Open"} />
              ) : (
                <P text="Closed" />
              )}
            </div>
            <div>
              <P
                text={
                  data?.company.address.street +
                  " " +
                  data?.company.address.houseNumber +
                  ", " +
                  data?.company.address.zipCode
                }
              ></P>
            </div>
          </div>
          <hr className="border-t-2 border-gray-300 mt-2" />
        </div>
        <div className="mx-12 my-2">
          <P text={data?.company.description}></P>
        </div>

        <div className="mx-12 my-2">
          <Link className={buttonVariants()}>
            <FaCalendarDay />
            Book tid{" "}
          </Link>
        </div>

        <div className="mx-12 my-3">
          <div className="flex space-x-4">
            <div>
              <H2 text="Services"></H2>
                    <TableHead className="font-semibold">Kategorier</TableHead>
              <Table className="border border-double border-2 ">
                <TableHeader>
                </TableHeader>
                <TableBody>
                  {data.company.services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell key={service.id}>{service.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="min-w-fit my-10">
              <H2 text="JACKS COMPONENT PLACEHOLDER"></H2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompanyHomePage
