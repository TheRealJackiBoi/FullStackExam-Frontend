import { getCompanyByID } from "@/graphql/company/companyQueries";
import { useQuery } from "@apollo/client";

interface companyProp {
    companyId: string,
  }

function CompanyHomePage(props: companyProp) {

    const { data, loading } = useQuery(getCompanyByID, {
        variables: {_id: props.companyId},
      });


  return (
    <>
      <div>
        
      </div>
    </>
  )
}

export default CompanyHomePage
