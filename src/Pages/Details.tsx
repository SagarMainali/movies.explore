import { useParams } from "react-router-dom"

export function Details() {

  const { id } = useParams()

  console.log(id)
  console.log('first')

  return (
    <div className="pt-[50px]">
      <h2>Movie id = {id}</h2>
    </div>
  )
}