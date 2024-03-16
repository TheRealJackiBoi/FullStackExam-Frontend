import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Company } from "@/types/companyTypes"
import { Button } from "./ui/button"
import CreateServiceModal from "./CreateServiceModal"
import { H2 } from "./Typography"

const CompanyAdminServiceTable = ({ company, token}: { company: Company, token: string }) => {
  return (
    <>
      <div className="flex w-full justify-between">
        <H2 text="Services" className=" border-b-0" />
        <CreateServiceModal companyId={ company._id! } token={token}/>
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
                  <TableCell className=" rounded-full w-10 h-full mx-auto -p-2 overflow-hidden flex justify-center">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-auto object-cover rounded-full"
                    />
                  </TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.estimatedPrice}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    {/* select for devices */}
                    <Button variant={"secondary"}>Ændre billede</Button>
                    <Button variant={"destructive"}>Slet</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}

export default CompanyAdminServiceTable
