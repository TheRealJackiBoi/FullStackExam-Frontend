import { FC } from "react";
import { H1 } from "@/components/Typography";
import { useParams } from "react-router-dom";


const CompanyAdminPage: FC = () => {
  
  const {id} = useParams();

  return (
    <>
      <H1 text={id as string} />
    </>
  )
}

export default CompanyAdminPage;