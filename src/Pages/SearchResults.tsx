import { useParams } from "react-router-dom"
import { fetchDataFromApi } from "../utils/api"
import { Loading } from "../Components/helperComponents/Loading"
import { MainDataType, MovieAndShowsDetails } from "../types/type"
import { Card } from "../Components/globalComponents/Card"
import { NoResults } from "../Components/helperComponents/NoResults"
import { useState, useEffect, useRef } from 'react'
import InfiniteScroll from "react-infinite-scroll-component"
import { Skeleton } from "../Components/globalComponents/Skeleton"

export function SearchResults() {

     const { searchQuery } = useParams()

     const [customLoading, setCustomLoading] = useState<boolean>(true)

     const [data, setData] = useState<MovieAndShowsDetails[]>([])

     const totalPages = useRef<number>(0)

     const pageNum = useRef<number>(1)

     async function fetchInitialData() {
          const initialData: MainDataType = await fetchDataFromApi(`/search/multi?query=${searchQuery}`)
          setData(initialData.results)
          totalPages.current = initialData.total_pages
          pageNum.current = 2
          setCustomLoading(false)
     }

     async function fetchNextPageData() {
          const { results } = await fetchDataFromApi(`/search/multi?query=${searchQuery}&page=${pageNum.current}`)
          setData((prevData: MovieAndShowsDetails[]) => [...prevData, ...results])
          pageNum.current = pageNum.current + 1
     }

     useEffect(() => {
          setCustomLoading(true)
          setData([])
          fetchInitialData()
     }, [searchQuery])

     return (
          customLoading && data.length < 1
               ?
               <Skeleton containerType="search-results"/>
               : data.length > 0
                    ?
                    <InfiniteScroll
                         className="pt-[60px] grid sm:gap-x-4 sm:gap-y-6 gap-x-3 gap-y-6 
                                    xl:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 xsm:grid-cols-3 grid-cols-2"
                         next={fetchNextPageData}
                         dataLength={data?.length || 0}
                         hasMore={pageNum.current <= totalPages.current}
                         loader={
                              <div className="col-span-full h-[90px]">
                                   <Loading forScrolling={true} />
                              </div>
                         }
                         endMessage={
                              <p className="col-span-full text-center">
                                   No more data to show.
                              </p>
                         }
                    >
                         {
                              // first checking the type of 'data' which should return true and proceed if it is an array
                              Array.isArray(data) && data?.map(
                                   (movieOrShow: MovieAndShowsDetails) => {
                                        if (movieOrShow.media_type === 'person') return
                                        return <Card key={movieOrShow.id} {...movieOrShow} customMediaType={movieOrShow.media_type} />
                                   }
                              )
                         }
                    </InfiniteScroll>
                    :
                    <NoResults searchQuery={searchQuery} />
     )
}
