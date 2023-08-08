import { useFetchDataFromApi } from "../utils/api"
import { MovieAndShowsDetails } from "../types/type"
import { Card } from "../Components/globalComponents/Card"
import { useState, useEffect } from "react"
import InfiniteScroll from 'react-infinite-scroll-component'
import { Loading } from "../Components/helperComponents/Loading"

export function Explorer({ explore }: { explore: string }) {

     const [pageNum, setPageNum] = useState<number>(1)

     // initial fetching
     const { data } = useFetchDataFromApi(`/discover/${explore}?page=${pageNum}`)

     const [dataList, setDataList] = useState<MovieAndShowsDetails[]>([])

     useEffect(() => {
          if (Array.isArray(data)) {
               setDataList(
                    (prevDataList: MovieAndShowsDetails[]) => [...prevDataList, ...data]
               )
               console.log(dataList)
          }
     }, [data, pageNum])

     function changePageNum() {
          setPageNum((prevPageNum: number) => prevPageNum + 1)
     }

     return (
          <InfiniteScroll
               className="py-[60px] grid sm:gap-x-4 sm:gap-y-6 gap-x-3 gap-y-5 xl:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 xsm:grid-cols-3 grid-cols-2"
               next={changePageNum}
               dataLength={dataList.length}
               hasMore={true}
               loader={<Loading forScrolling={true} />}
               endMessage={
                    <p style={{ textAlign: 'center' }}>
                         <b>Yay! You have seen it all</b>
                    </p>
               }
          >
               {
                    // first checking the type of 'data' which should return true and proceed if it is an array
                    Array.isArray(dataList) && dataList?.map(
                         (movieOrShow: MovieAndShowsDetails) => <Card key={movieOrShow.id} {...movieOrShow} customMediaType={explore} />
                    )
               }
          </InfiniteScroll>

     )
}
