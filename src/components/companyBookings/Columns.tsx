import { Booking, Status } from "@/types/bookingTypes"
import { Button } from "../ui/button"
import { ColumnDef } from "@tanstack/react-table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useToast } from "../ui/use-toast"
import { useMutation } from "@apollo/client"
import { DELETE_BOOKING } from "@/graphql/booking/bookingMutations"
import { GET_COMPANY_BY_ID } from "@/graphql/company/companyQueries"
import facade from "@/util/authFacade"

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
      const startTime = booking.startTime
      const date = new Date(parseInt(startTime))
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

      return (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Vælg status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {statusValues.map((s: Status) => (
                <SelectItem value="s">{s}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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
          <Button variant={"destructive"} onClick={handleDelete} >Slet</Button>
        </div>
      )
    },
  },
]
