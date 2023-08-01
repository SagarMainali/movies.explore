import { ReactNode } from 'react'

export type MovieAndShowsDetails = {
     id: number,
     name: string,
     title: string,
     tagline: string,
     overview: string,
     media_type: string,
     release_date: string,
     vote_average: number,
     vote_count: number,
     backdrop_path: string,
     poster_path: string,
     original_language: string,
     homepage: string,
     budget: number,
     revenue: number,
     runtime: number,
}

export type ChildrenType = {
     children: ReactNode
}

export type GlobalContextType = {
     menuTogglerActive: boolean,
     changeMenuTogglerState: () => void
}