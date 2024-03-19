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
            <SelectValue defaultValue={status} placeholder="Vælg status" />
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
      return (
        <div className="flex justify-end">
          <Button variant={"destructive"}>Slet</Button>
        </div>
      )
    },
  },
]
