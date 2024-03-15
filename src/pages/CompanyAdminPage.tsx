import { FC } from "react";
import { H1, H2 } from "@/components/Typography";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COMPANY } from "@/graphql/companyQueries";
import { Skeleton } from "@/components/ui/skeleton";
import { Company } from "@/types/companyTypes";
import CompanyAdminServiceTable from "@/components/CompanyAdminServiceTable";


const CompanyAdminPage: FC = () => {
  
  const {id} = useParams();

  const { loading, error, data } = useQuery(GET_COMPANY, {
    variables: { id },
  })
  

  if (loading) return (
    <>
      <Skeleton className="h-4"/>
      <Skeleton className="h-10"/>
      <Skeleton className="h-10"/>
    </>
  );
  if (error) return <p>Error :(</p>;
  const company: Company = data?.company;
  return (
    <>
      <H1 text={company!.name} className=" my-4 "/>
      {/* description */} 
      <CompanyAdminServiceTable company={company} />
    </>
  )
}

export default CompanyAdminPage;