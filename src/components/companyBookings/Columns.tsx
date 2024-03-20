import { Booking, Status } from "@/types/bookingTypes"
import { Button } from "../ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { useToast } from "../ui/use-toast"
import { useMutation } from "@apollo/client"
import { DELETE_BOOKING, UPDATE_BOOKING } from "@/graphql/booking/bookingMutations"
import { GET_COMPANY_BY_ID } from "@/graphql/company/companyQueries"
import facade from "@/util/authFacade"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "case.service.name",
    header: "Service",
  },
  {
    accessorKey: "case.device",
    header: "Enhed",
  },
  {
    accessorKey: "startTime",
    header: "Start tid",
    cell: ({ row }) => {
      const booking: Booking = row.original
      const startTime = booking.startTime
      const date = new Date(parseInt(startTime))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "endTime",
    header: "Slut tid",
    cell: ({ row }) => {
      const booking: Booking = row.original
      const endTime = booking.endTime
      const date = new Date(parseInt(endTime))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "user._id",
    header: "Bruger id",
  },
  {
    accessorKey: "user.firstName",
    header: "Bruger",
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const booking: Booking = row.original
      const status = booking.status
      const statusValues = Object.values(Status)

      const { toast } = useToast()

      const [updateBooking] = useMutation(UPDATE_BOOKING, {
        refetchQueries: [GET_COMPANY_BY_ID]
      })
      
      const handleUpdateStatus = async(newStatus: string) => {
        if (newStatus === status) {
          return;
        }
        await updateBooking({
          variables: {
            "id": booking._id,
            "device": booking.case.device,
            "cost": booking.case.cost,
            "serviceId": booking.case.service!._id,
            "token": facade.getToken(),
            "status": newStatus,
          }
        })
        .then(() => {
          toast({
            title: "Status opdateret",
            description: `Status for bookingen er blevet opdateret`,
          })
        })
        .catch((err: Error) => {
          toast({
            title: "Fejl",
            description: "Der skete en fejl under opdatering af status",
          })
          console.log(err)
        })
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>{status || "Vælg status"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup onValueChange={handleUpdateStatus}>
              {statusValues.map((s: Status) => (
                <DropdownMenuRadioItem value={s} key={s}>{s}</DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const booking: Booking = row.original

      const { toast } = useToast()

      const [deleteBooking] = useMutation(DELETE_BOOKING, {
        refetchQueries: [GET_COMPANY_BY_ID],
      })

      const handleDelete = async () => {
        await deleteBooking({
          variables: {
            id: booking._id,
            token: facade.getToken(),
          },
        })
          .then(() => {
            toast({
              title: "Booking slettet",
              description: `Bookingen er blevet slettet`,
            })
          })
          .catch((err: Error) => {
            toast({
              title: "Fejl",
              description: "Der skete en fejl under sletning af bookingen",
            })
            console.log(err)
          })
      }

      return (
        <div className="flex justify-end">
          <Button variant={"destructive"} onClick={handleDelete}>
            Slet
          </Button>
        </div>
      )
    },
  },
]
