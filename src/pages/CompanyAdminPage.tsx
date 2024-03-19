import { FC } from "react"
import { H1, H2 } from "@/components/Typography"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { Skeleton } from "@/components/ui/skeleton"
import { Company } from "@/types/companyTypes"
import CompanyAdminServiceTable from "@/components/CompanyAdminServiceTable"
import facade from "@/util/authFacade"
import DescriptionForm from "@/components/DescriptionForm"
import { GET_COMPANY_BY_ID } from "@/graphql/company/companyQueries"
import CategoryForm from "@/components/CategoryForm"
import CompanyAdminTable from "@/components/companyAdmins/CompanyAdminTable"

const CompanyAdminPage: FC = () => {
  const token = facade.getToken()
  const { id } = useParams()

  // fetching company data
  const { loading, error, data } = useQuery(GET_COMPANY_BY_ID, {
    variables: { id },
  })

  // validating user and token
  if (!token) {
    return <H1 text="Du er ikke logget ind" />
  }

  // loading and error handling
  if (loading)
    return (
      <>
        <Skeleton className="h-4" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </>
    )
  if (error)
    return (
      <>
        <H1 text="Fejl" />
        <H2 text="Der skete en fejl, prøv igen senere" />
      </>
    )

  const company: Company = data?.company
  return (
    <>
      <H1 text={company!.name} className=" my-4 " />
      <div className="flex gap-4">
        <DescriptionForm company={company} token={token} />
        <CategoryForm company={company} token={token} />
      </div>

      <CompanyAdminServiceTable company={company} token={token} />
      <CompanyAdminTable company={company} token={token} />
    </>
  )
}

export default CompanyAdminPage
