import { FC } from "react"
import { H1, H2 } from "@/components/Typography"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_COMPANY } from "@/graphql/companyQueries"
import { Skeleton } from "@/components/ui/skeleton"
import { Company } from "@/types/companyTypes"
import CompanyAdminServiceTable from "@/components/CompanyAdminServiceTable"
import facade from "@/util/authFacade"
import { GET_USER } from "@/graphql/user/userQueries"
import { User } from "@/types/usertypes"
import DescriptionForm from "@/components/DescriptionForm"

const CompanyAdminPage: FC = () => {
  const token = facade.getToken()
  let user: User | null = null;
  const userId = facade.getIdFromToken()
  const { id } = useParams()

  const userRes = useQuery(GET_USER, {
    variables: { id: userId, token: token },
  })

  // fetching company data
  const { loading, error, data } = useQuery(GET_COMPANY, {
    variables: { id },
  })

  // loading and error handling for user
  if (userRes.loading) return <p>Loading...</p>
  if (userRes.error) return <p>Error</p>
  user = userRes.data.user

  // validating user and token
  if (!user || !token) {
    return <H1 text="Du er ikke logget ind" />
  }

  if ((!user.company || user.company._id !== id) && user.role !== "ADMIN") {
    return <H1 text="Du er ikke tilknyttet en virksomhed" />
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
      <DescriptionForm company={company} token={token} />
      <CompanyAdminServiceTable company={company} token={token} />
    </>
  )
}

export default CompanyAdminPage
