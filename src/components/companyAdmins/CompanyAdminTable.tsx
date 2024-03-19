import { Company } from "@/types/companyTypes"
import { H2 } from "../Typography"
import { Card } from "../ui/card"
import CompanyAdminDataTable from "./CompanyAdminDataTable"
import { columns } from "./Columns"
import CreateAdminModal from "./CreateAdminModal"


const CompanyAdminTable = ({ company, token}: { company: Company, token: string }) => {
  return (
    <>
      <div className="flex w-full justify-between mt-4">
        <H2 text="Admins" />
        <CreateAdminModal companyId={company._id!} token={token} />
      </div>
      <Card className="p-2 mt-2">
        <CompanyAdminDataTable columns={columns} data={company.admins!} /> 
      </Card>
    </>
  )
}

export default CompanyAdminTable