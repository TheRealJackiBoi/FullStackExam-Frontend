import { H1 } from "@/components/Typography"

function errorPage() {
  return (
    <>
      <div className="flex flex-col mt-52 justify-center items-center">
        <H1 text={"404"} />
        <p>Noget gik galt :(</p>
      </div>
    </>
  )
}

export default errorPage
