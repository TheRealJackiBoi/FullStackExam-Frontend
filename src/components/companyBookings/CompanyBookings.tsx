import { Booking } from "@/types/bookingTypes"
import { H2 } from "../Typography"
import CompanyBookingsTable from "./CompanyBookingsDataTable"
import { columns } from "./Columns"


const CompanyBookings = ({
  bookings,
  token,
}: {
  bookings: Booking[],
  token: string
}) => {
  


  return (
    <div>
      <H2 text="Bookinger" />
      <CompanyBookingsTable columns={columns} data={bookings}/>
    </div>
  )
}

export default CompanyBookings