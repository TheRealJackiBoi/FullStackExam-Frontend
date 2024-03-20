import CategoryCard from "./CategoryCard"
function CategoryCards() {
  return (
    <div className="flex flex-wrap mb-5 md:justify-start justify-center gap-2 mt-10">
      <CategoryCard value={"pc"} label={"PC"} />

      <CategoryCard value={"mobile"} label={"Mobil"} />

      <CategoryCard value={"tablet"} label={"Tablet"} />

      <CategoryCard value={"console"} label={"Spille konsol"} />

      <CategoryCard value={"printer"} label={"printer"} />

      <CategoryCard value={"tv"} label={"TV"} />

      <CategoryCard value={"smarthome"} label={"Smart home"} />
    </div>
  )
}

export default CategoryCards
