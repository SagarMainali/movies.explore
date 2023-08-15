import { fetchDataFromApi } from "../utils/api"
import { MainDataType, MovieAndShowsDetails } from "../types/type"
import { Card } from "../Components/globalComponents/Card"
import { useState, useEffect, useRef } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'
import { Loading } from "../Components/helperComponents/Loading"
import { Skeleton } from "../Components/globalComponents/Skeleton"

export function Explorer({ explore }: { explore: string }) {

     const [customLoading, setCustomLoading] = useState<boolean>(true)

     const [data, setData] = useState<MovieAndShowsDetails[]>([])

     const totalPages = useRef<number>(0)

     const pageNum = useRef<number>(1)

     async function fetchInitialData() {
          const initialData: MainDataType = await fetchDataFromApi(`/discover/${explore}`)
          setData(initialData.results)
          totalPages.current = initialData.total_pages
          // this function is being invoked 1 additional time by React.StrictMode therefore the pageNum is changed directly to 2
          // instead of adding 1 to previous value, it is the same thing because either way this function sets the appropriate pageNum
          // to be used in the function fetchNextPageData()
          pageNum.current = 2
          setCustomLoading(false)
     }

     async function fetchNextPageData() {
          const { results }: MainDataType = await fetchDataFromApi(`/discover/${explore}?page=${pageNum.current}`)
          setData((prevData: MovieAndShowsDetails[]) => [...prevData, ...results])
          pageNum.current = pageNum.current + 1
     }

     useEffect(() => {
          setCustomLoading(true)
          setData([])
          fetchInitialData()
     }, [explore])

     return (
          customLoading && data.length < 1
               ?
               <Skeleton containerType="explorer"/>
               :
               <InfiniteScroll
                    className="pt-[60px] grid sm:gap-x-4 sm:gap-y-6 gap-x-3 gap-y-6 
                               xl:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 xsm:grid-cols-3 grid-cols-2"
                    next={fetchNextPageData}
                    dataLength={data?.length || 20}
                    hasMore={pageNum.current <= totalPages.current}
                    scrollThreshold={0.8}
                    loader={
                         <div className="col-span-full h-[90px]">
                              <Loading forScrolling={true} />
                         </div>
                    }
                    endMessage={
                         <p className="col-span-full text-center">
                              You have reached the end of results. Try searching.
                         </p>
                    }
               >
                    {
                         // first checking the type of 'data' which should return true and proceed if it is an array
                         Array.isArray(data) && data?.map(
                              (movieOrShow: MovieAndShowsDetails) => <Card key={movieOrShow.id} {...movieOrShow} customMediaType={explore} />
                         )
                    }
               </InfiniteScroll>

     )
}
