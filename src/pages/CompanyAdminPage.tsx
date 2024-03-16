import { FC } from "react"
import { H1, H2 } from "@/components/Typography"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_COMPANY } from "@/graphql/companyQueries"
import { Skeleton } from "@/components/ui/skeleton"
import { Company } from "@/types/companyTypes"
import CompanyAdminServiceTable from "@/components/CompanyAdminServiceTable"
import useAuth from "@/util/AuthContext"
import facade from "@/util/authFacade"

const CompanyAdminPage: FC = () => {
  const { user } = useAuth()
  const token = facade.getToken()

  const { id } = useParams()

  const { loading, error, data } = useQuery(GET_COMPANY, {
    variables: { id },
  })

  console.log(user, token)

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
  if (error) return <p>Error :(</p>

  const company: Company = data?.company
  return (
    <>
      <H1 text={company!.name} className=" my-4 " />
      {/* description */}
      <CompanyAdminServiceTable company={company} token={token}/>
    </>
  )
}

export default CompanyAdminPage
