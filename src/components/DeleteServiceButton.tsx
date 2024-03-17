import { useMutation } from "@apollo/client"
import { Button } from "./ui/button"
import { DELETE_SERVICE } from "@/graphql/service/serviceMutations"
import { useToast } from "./ui/use-toast"
import { Service } from "@/types/serviceTypes"
import { GET_COMPANY } from "@/graphql/companyQueries"

const DeleteServiceButton = ({
  serviceId,
  token,
}: {
  serviceId: string
  token: string
}) => {
  const [deleteService] = useMutation(DELETE_SERVICE, {
    refetchQueries: [GET_COMPANY],
  })

  const { toast } = useToast()

  const handleDelete = () => {
    deleteService({
      variables: { id: serviceId, token: token },
    })
    .then((service) => {
      toast({
        title: "Service slettet",
        description: `Service ${(service as Service).name}er blevet slettet`,
      }) 
    })
    .catch((error) => {
      toast({
        title: "Fejl",
        description: `Der skete en fejl, prøv igen senere`,
      }) 
      console.log(error)
    })
  }

  return <Button variant={"destructive"} onClick={handleDelete}>Slet</Button>
}

export default DeleteServiceButton