import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

function CategoryCard({ value, label }: { value: string; label: string }) {
  return (
    <Link
      className="w-full sm:w-6/12 md:w-3/12 sm:w-4/12 lg:w-2/12"
      to={`/search?search=${value}`}
      key={value}
    >
      <Card className="w-12/12 min-w-fit">
        <div className="w-full rounded-t-xl">
          <img
            src="https://placehold.co/600x400/EEE/31343C"
            className="w-full h-40 object-cover rounded-t-xl"
          />
        </div>
        <CardContent className="mt-1 flex justify-between gap-4 p-2">
          <CardTitle>{label}</CardTitle>
        </CardContent>
      </Card>{" "}
    </Link>
  )
}

export default CategoryCard
