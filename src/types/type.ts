import { ReactNode } from 'react'

export type MovieAndShowsDetails = {
     id: number,
     name: string,
     title: string,
     tagline: string,
     overview: string,
     media_type: string,
     release_date: string,
     first_air_date: string,
     last_air_date: string,
     vote_average: number,
     vote_count: number,
     backdrop_path: string,
     poster_path: string,
     original_language: string,
     homepage: string,
     budget: number,
     revenue: number,
     runtime: number,
     number_of_seasons: number,
     number_of_episodes: number,
     status: string,
     genres: {
          id: number,
          name: string
     }[],
}

export type CastType = {
     id: number,
     original_name: string,
     profile_path: string,
     character: string,
}

export type DataResponse = {
     results: MovieAndShowsDetails[],
     cast: CastType[]
}

export type ChildrenType = {
     children: ReactNode
}

export type GlobalContextType = {
     menuTogglerActive: boolean,
     changeMenuTogglerState: () => void
}