import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { MovieAndShowsDetails } from "../types/type"

const base_url: string = 'https://api.themoviedb.org/3'

const tmdb_api_access_token: string = import.meta.env.VITE_APP_TMDB_API_ACCESS_TOKEN

const headers = {
     Authorization: 'bearer ' + tmdb_api_access_token
}

export const fetchDataFromApi = (url: string, params?: string) => {

     return useQuery({
          queryKey: ['movies', url],
          queryFn: async () => {
               const { data } = await axios.get(base_url + url, {
                    headers,
                    params
               })
               return data.results as MovieAndShowsDetails[]     
          }
     })

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
}

export const image_baseUrl = 'https://image.tmdb.org/t/p/original'

export const video_baseUrl = 'https://www.youtube.com/watch?v='