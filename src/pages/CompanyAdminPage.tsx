import { FC } from "react";
import { H1, H2 } from "@/components/Typography";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@apollo/client";
import { GET_COMPANY } from "@/graphql/companyQueries";
import { Skeleton } from "@/components/ui/skeleton";
import { ICompany } from "@/types/companyTypes";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";


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
  const company: ICompany = data?.company;
  return (
    <>
      <H1 text={company!.name} className=" my-4 "/>
      {/* description */}
      <div className="flex w-full justify-between">
        <H2 text="Services" className=" border-b-0" />
        <Button variant={"secondary"} className=" bg-blue-500 text-white">Tilføj service</Button>
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
            {company.services && company.services.map((service) => (
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

export default CompanyAdminPage;