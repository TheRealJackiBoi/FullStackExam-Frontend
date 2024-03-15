import { P, H1, H2 } from "@/components/Typography"
import { buttonVariants } from "@/components/ui/button"
import { getCompanyByID } from "@/graphql/company/companyQueries"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { FaCalendarDay } from "react-icons/fa6"
import { Table } from "@/components/ui/table"
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

function Rendere({ specificCompany: data }: ICompany ) {
  return (
    <>
      <div>
        <div>
          <div>
            <H1 text={data?.company.name}></H1>
          </div>
          <div>
            {data.company.openForBooking ? <P text={"Open"} /> : <P text="Closed" />}
          </div>
        </div>
        <div>
          <P text={data?.company.description}></P>
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

export default CompanyHomePage
