import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const base_url: string = 'https://api.themoviedb.org/3'

const tmdb_api_access_token: string = import.meta.env.VITE_APP_TMDB_API_ACCESS_TOKEN

const headers = {
     Authorization: 'bearer ' + tmdb_api_access_token
}

// to be used inside useEffect since it don't have useQuery
// &&
// to be used when we want the exact data we get from calling api without filtering
export async function fetchDataFromApi(endpoint: string) {
     const { data } = await axios.get(base_url + endpoint, {
          headers
     })
     return data
}

// can't be used inside useEffect since it returns useQuery hook
export const useFetchDataFromApi = (endpoint: string) => {
     return useQuery({
          queryKey: [endpoint],
          queryFn: async () => {
               const data = await fetchDataFromApi(endpoint)
               return data.results ? data.results : data.cast ? data.cast : data
          }
     })
}

     // without useQuery
     // try {
     //      const { data } = await axios.get(base_url + url, {
     //           headers,
     //           params
     //      })
     //      return data.results
     // }
     // catch (error) {
     //      console.log(error)
     //      return error
     // }