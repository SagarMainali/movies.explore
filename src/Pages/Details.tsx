import { useParams } from "react-router-dom"

export function Details() {

  const { id } = useParams()

  return (
    <div className="pt-[50px]">
      <h2>Movie/Show id = {id}</h2>
    </div>
  )
}
