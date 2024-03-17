import CompanyCard from "@/components/CompanyCard"
import { useQuery } from "@apollo/client"
import { GET_COMPANIES } from "@/graphql/company/companyQueries"
import { Link } from "react-router-dom"
import { Company } from "@/types/companyTypes"
import { Skeleton } from "@/components/ui/skeleton"
import { H1, H2 } from "@/components/Typography"

function Index() {
  const { data, loading, error } = useQuery(GET_COMPANIES)

  // loading and error handling
  if (loading)
    return (
      <>
        <Skeleton className="h-4" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </>
    )
  if (error || !data)
    return (
      <>
        <H1 text="Fejl" />
        <H2 text="Der skete en fejl, prøv igen senere" />
      </>
    )

  const companies: Company[] = data.companies
  return (
    <>
      <H1 text="I nærheden" />
      <div className="flex flex-wrap gap-4 mt-10">
        {companies.map((company) => (
          <Link
            className="w-1/10"
            to={`/company/${company._id}`}
            key={company._id}
          >
            <CompanyCard company={company} />
          </Link>
        ))}
      </div>
    </>
  )
}

export default Index
