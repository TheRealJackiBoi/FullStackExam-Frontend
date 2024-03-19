import { useForm } from "react-hook-form"
import { H2 } from "./Typography"
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { cn } from "@/utilities"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "./ui/button"
import { Company } from "@/types/companyTypes"
import { useMutation } from "@apollo/client"
import { UPDATE_COMPANY_BY_ID } from "@/graphql/company/companyMutation"
import { GET_COMPANY_BY_ID } from "@/graphql/company/companyQueries"
import { useToast } from "./ui/use-toast"
import { companyCategoriesSchema } from "@/schema/companyCategory"
import { Badge } from "./ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { CategoryEnum } from "@/types/categoryEnum"

const CategoryForm = ({
  company,
  token,
}: {
  company: Company
  token: string
}) => {
  const { toast } = useToast()
  const [updateCompany] = useMutation(UPDATE_COMPANY_BY_ID, {
    refetchQueries: [GET_COMPANY_BY_ID],
  })

  const [selectedCategories, setSelectedCategories] = useState<CategoryEnum[]>(
    company.categories || []
  )

  const CategoryEnumValues = Object.values(CategoryEnum)

  const onSubmit = async (values: z.infer<typeof companyCategoriesSchema>) => {
    await updateCompany({
      variables: {
        id: company._id,
        houseNumber: company.address.houseNumber,
        streetName: company.address.street,
        zipCode: company.address.zipCode,
        name: company.name,
        token: token,
        description: company.description,
        categories: values.categories,
      },
    })
      .then(() => {
        toast({
          title: "Opdateret Kategorier",
          description: "Kategorierne for virksomheden er blevet opdateret",
        })
      })
      .catch((error: Error) => {
        toast({
          variant: "destructive",
          title: "fejl",
          description: "kunne ikke opdatere kategorier, prøv igen senere",
        })
        console.log(error)
      })
  }

  return (
    <>
      <div className="flex flex-col max-w-72">
        <H2 text="Kategorier" className="self-end" />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-10">
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              <span>Vælg kategorier</span>
              {selectedCategories.length > 0 && (
                <>
                  <Separator orientation="vertical" className="mx-2 h-4" />

                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal lg:hidden"
                  >
                    {selectedCategories.length}
                  </Badge>
                  <div className="hidden space-x-1 lg:flex">
                    {selectedCategories.length > 2 ? (
                      <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal"
                      >
                        {selectedCategories.length} valgt
                      </Badge>
                    ) : (
                      selectedCategories.map((category) => (
                        <Badge
                          variant="secondary"
                          key={category}
                          className="rounded-sm px-1 font-normal"
                        >
                          {category}
                        </Badge>
                      ))
                    )}
                  </div>
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Command>
              <CommandInput placeholder="kategorier" />
              <CommandList>
                <CommandGroup>
                  {CategoryEnumValues.map((category) => {
                    const isSelected = selectedCategories.includes(category)
                    return (
                      <CommandItem
                        key={category}
                        value={category}
                        onSelect={() => {
                          if (isSelected) {
                            setSelectedCategories((prev) =>
                              prev.filter((c) => c !== category)
                            )
                          } else {
                            setSelectedCategories((prev) => [...prev, category])
                          }
                        }}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          )}
                        >
                          <CheckIcon className={cn("h-4 w-4")} />
                        </div>

                        <span>{category}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <br />
        <Button
          onClick={() => onSubmit({ categories: selectedCategories })}
          variant={"secondary"}
          className=" self-end bg-blue-500 text-white hover:bg-blue-300"
        >
          Opdater kategorier
        </Button>
      </div>
    </>
  )
}

export default CategoryForm
