import { FC } from "react";
import { H1, H2 } from "@/components/Typography";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@apollo/client";
import { GET_COMPANY } from "@/graphql/companyQueries";
import { Skeleton } from "@/components/ui/skeleton";


const CompanyAdminPage: FC = () => {
  
  const {id} = useParams();

  const { loading, error, data } = useQuery<>(GET_COMPANY, {
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
  return (
    <>
      <H1 text={data.name} className=" mt-44"/>
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