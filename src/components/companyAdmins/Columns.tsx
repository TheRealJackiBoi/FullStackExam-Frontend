import { User } from "@/types/usertypes"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { useMutation } from "@apollo/client"
import { DELETE_COMPANY_ADMIN } from "@/graphql/company/companyMutation"
import { GET_COMPANY_BY_ID } from "@/graphql/company/companyQueries"
import { useToast } from "../ui/use-toast"
import facade from "@/util/authFacade"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "Fornavn",
  },
  {
    accessorKey: "lastName",
    header: "Efternavn",
  },
  {
    accessorKey: "role",
    header: "Rolle",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      const { toast } = useToast()

      const [ deleteCompanyAdmin ] = useMutation(DELETE_COMPANY_ADMIN, {
        refetchQueries: [GET_COMPANY_BY_ID],
      })

      const handleDelete = async() => {
        console.log(user)
        await deleteCompanyAdmin({
          variables: {
            userId: user._id,
            companyId: user.company?._id,
            token: facade.getToken(),
          },
        })
        .then((res) => {
          toast({
            title: "Admin slettet",
            description: `Admin ${res.data.deleteCompanyAdmin.firstName} er blevet slettet`,
          })
        })
        .catch((err: Error) =>{
          toast({
            title: "Fejl",
            description: "Der skete en fejl under sletning af admin",
          })
          console.log(err)
        })
      }

      return (
        <div className="flex justify-end">
          <Button variant={"destructive"} onClick={handleDelete}>Slet</Button>
        </div>
      )
    }
  }
]