import { ReactNode } from 'react'

export type MovieAndShowsDetails = {
     id: number,
     name: string,
     title: string,
     overview: string,
     media_type: string,
     release_date: string,
     vote_average: number,
     backdrop_path: string,
     original_language: string,
}

export type ChildrenType = {
     children: ReactNode
}

export type GlobalContextType = {
     menuTogglerActive: boolean,
     changeMenuTogglerState: () => void
}