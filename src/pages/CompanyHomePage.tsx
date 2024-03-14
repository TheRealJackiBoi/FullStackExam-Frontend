import { P, H1, H2 } from "@/components/Typography"
import { buttonVariants } from "@/components/ui/button"
import { getCompanyByID } from "@/graphql/company/companyQueries"
import { UseQueryRefHandlersResult, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { FaCalendarDay } from "react-icons/fa6"
import { Table } from "@/components/ui/table"

interface companyProp {
  companyId: string
}

const CompanyHomePage = (props: companyProp) => {
  const { data, loading } = useQuery(getCompanyByID, {
    //variables: { _id: "65f2e44f45a53b3aaf8a0b31" },
    variables: { id: props.companyId },
  })

  if(loading) {
    return (
      <H1 text="Loading Company"></H1>
    );
  }

  if(!data ) {
    return (
      <H1 text="No Company found"></H1>
    );
  }

  return (
    <>
      <div>
        <Rendere company={data} />
      </div>
    </>
  )
}

function Rendere({ company: company }) {
  return (
    <>
      <div>
        <div>
          <div>
            <H1 text={company?.company.name + " companyNamePlaceHolder"}></H1>
          </div>
        </div>
        <div>
          <P text={company?.company.description + " CompanyDescPlaceHolder"}></P>
          <Link className={buttonVariants()}>
            <FaCalendarDay />
            Book tid{" "}
          </Link>
        </div>

        <div>
          <H2 text="Services"></H2>
          <div>
            <div>
              <Table />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompanyHomePage;