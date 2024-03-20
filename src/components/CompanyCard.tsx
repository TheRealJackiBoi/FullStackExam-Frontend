import { Company } from "@/types/companyTypes"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "./ui/card"
import { Badge } from "@/components/ui/badge"

const MAX_SERVICES_DISPLAY = 3 // Display only the first 3 services

const CompanyCard = ({ company }: { company: Company }) => {
  const renderServices = () => {
    if (!company.services) return null

    const displayedServices = company.services.slice(0, MAX_SERVICES_DISPLAY)
    const remainingServicesCount = Math.max(
      company.services.length - MAX_SERVICES_DISPLAY,
      0
    )

    return (
      <>
        {displayedServices.map((service) => (
          <Badge
            key={service._id}
            variant="secondary"
            className="text-nowrap mr-1 overflow-hidden"
          >
            {service.name}
          </Badge>
        ))}
        {remainingServicesCount > 0 && (
          <Badge variant="secondary" className="text-nowrap overflow-hidden">
            +{remainingServicesCount}
          </Badge>
        )}
      </>
    )
  }

  return (
    <Card className="w-full min-w-fit">
      <div className="w-full rounded-t-xl">
        <img
          src="https://placehold.co/600x400/EEE/31343C"
          className="w-full h-40 object-cover rounded-t-xl"
        />
      </div>
      <CardContent className="mt-1 justify-between gap-4 p-2">
        <CardTitle>{company.name}</CardTitle>
        <CardDescription className="-mt-0.5">
          {company.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-2 pt-1 border-dashed border-t-2 overflow-hidden">
        {renderServices()}
      </CardFooter>
    </Card>
  )
}

export default CompanyCard
