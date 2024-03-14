import { Service } from "@/types/serviceTypes"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card"

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <Card className="w-3/12 min-w-fit">
      <div className="w-full rounded-t-xl">
        <img
          src={service.imageUrl}
          alt={service.name}
          className="w-full h-32 object-cover rounded-t-xl"
        />
      </div>
      <CardContent className="mt-1 flex justify-between gap-4">
        <CardTitle>{service.name}</CardTitle>

        <CardDescription className="-mt-0.5">{service.estimatedPrice} kr.</CardDescription>
      </CardContent>
    </Card>
  )
}

export default ServiceCard
