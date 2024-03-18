import { H1 } from "@/components/Typography"
import { GET_COMPANY_BY_ID } from "@/graphql/company/companyQueries"
import { Company } from "@/types/companyTypes"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"

interface CompanyData {
  company: Company
}

export const CompanyBookingPage = () => {
    const { id } = useParams<{ id: string }>()
    console.log(id)
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
  return (
    <>
      <H1 text={"Book service hos " + company.name}></H1>
    </>
  )
}
