import { User } from "@/types/usertypes"
import { ColumnDef } from "@tanstack/react-table"

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
  }
]