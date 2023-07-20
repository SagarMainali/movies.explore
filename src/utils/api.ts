import axios from "axios";

const base_url: string = 'https://api.themoviedb.org/3'

export const image_baseUrl = 'https://image.tmdb.org/t/p/original'

const tmdb_api_access_token: string = import.meta.env.VITE_APP_TMDB_API_ACCESS_TOKEN

const headers = {
     Authorization: 'bearer ' + tmdb_api_access_token
}

export async function fetchDataFromApi(url: string, params?: string) {
     try {
          const { data } = await axios.get(base_url + url, {
               headers,
               params
          })
          return data.results
     }
     catch (error) {
          console.log(error)
          return error
     }
}