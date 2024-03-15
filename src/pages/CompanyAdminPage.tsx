import { FC } from "react";
import { H1, H2 } from "@/components/Typography";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";


const CompanyAdminPage: FC = () => {
  
  const {id} = useParams();

  

  return (
    <>
      <H1 text={id as string} />
      {/* description */}
      <H2 text="Produkter" />
      <Card>
        <Table className=" rounded-xl ">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Navn</TableHead>
              <TableHead>Pris</TableHead>
              <TableHead>Funktioner</TableHead>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          </TableBody>
        </Table>
      </Card>
    </>
  )
}

export default CompanyAdminPage;