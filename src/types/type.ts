export type ChildrenType = {
     children: React.ReactNode
}

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
     gender: number,
     original_name: string,
     profile_path: string,
     character: string
}

export type MainDataType = {
     page: number,
     results: MovieAndShowsDetails[],
     total_pages: number,
     total_results: number
}

export type VideoType = {
     name: string,
     key: string,
     type: string
}

export type VideoModeType = {
     videoKey: string | null,
     openVideo: boolean
}

export type GlobalContextType = {
     menuTogglerActive: boolean,
     changeMenuTogglerState: () => void,
     changeDateFormat: (date: string) => string,
     itemContainer: React.RefObject<HTMLDivElement>
}