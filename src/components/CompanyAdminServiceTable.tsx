import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Company } from "@/types/companyTypes"
import { Button } from "./ui/button"
import CreateServiceModal from "./CreateServiceModal"

const CompanyAdminServiceTable = ({ company }: { company: Company }) => {
  return (
    <>
      <div className="flex w-full justify-between">
        <H2 text="Services" className=" border-b-0" />
        <CreateServiceModal />
      </div>
      <Card className="p-2 mt-2">
        <Table className=" rounded-xl ">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Navn</TableHead>
              <TableHead>Pris</TableHead>
              <TableHead className="text-right">Funktioner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {company.services &&
              company.services.map((service) => (
                <TableRow key={service._id}>
                  <td>
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </td>
                  <td>{service.name}</td>
                  <td>{service.estimatedPrice}</td>
                  <td>
                    {/* select for devices */}
                    <Button variant={"secondary"}>Ændre billede</Button>
                    <Button variant={"destructive"}>Slet</Button>
                  </td>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}

export default CompanyAdminServiceTable
