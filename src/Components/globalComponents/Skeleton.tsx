import '../../styles/skeleton.css'

export function Skeleton({ containerType }: { containerType: string }) {

     const screenWidth = window.screen.width

     let noOfskeletonItems = 0
     let skeletonItems = []

     // how many skeleton items to render is based on where it is to be rendered
     if (containerType === 'explorer' || containerType === 'search-results') noOfskeletonItems = 12
     else if (screenWidth >= 1300) noOfskeletonItems = 7
     else if (screenWidth < 1300 && screenWidth >= 1080) noOfskeletonItems = 6
     else if (screenWidth < 1080 && screenWidth >= 860) noOfskeletonItems = 5
     else if (screenWidth < 860 && screenWidth >= 620) noOfskeletonItems = 4
     else noOfskeletonItems = 3

     // adding the sekleton items itself on the array
     let i
     for (i = 0; i < noOfskeletonItems; i++) {
          skeletonItems.push(
               <div key={i} className={`rounded-xl overflow-hidden flex flex-col gap-1
                    ${containerType === 'home-category' || containerType === 'suggested-category'
                         ? `xl:min-w-[calc((100%/7)-10px+calc(10px/7))]
                         lg:min-w-[calc((100%/6)-10px+calc(10px/6))] 
                         md:min-w-[calc((100%/5)-10px+calc(10px/5))] 
                         sm:min-w-[calc((100%/4)-6px+calc(6px/4))]
                         min-w-[calc((100%/3)-6px+calc(6px/3))]`
                         : ''} `}>

                    <div className={`effect-skeleton
                              ${containerType === 'home-category'
                              ? 'w-[100%] xl:h-[280px] lg:h-[270px] md:h-[270px] sm:h-[260px] xsm:h-[250px] xxsm:h-[170px] h-[145px]'
                              : containerType === 'suggested-category'
                                   ? 'w-[100%] xl:h-[255px] lg:h-[240px] md:h-[265px] sm:h-[260px] xsm:h-[250px] xxsm:h-[170px] h-[145px]'
                                   : 'lg:h-[330px] md:h-[280px] sm:h-[260px] xsm:h-[280px] h-[300px]'}`} >
                    </div>

                    <h1 className="h-[40px] effect-skeleton"> </h1>
               </div>
          )
     }

     return (
          containerType === 'home-category' || containerType === 'suggested-category'
               ?
               <div className="hide-scrollbar flex md:gap-[10px] gap-[6px] overflow-x-scroll">
                    {skeletonItems}
               </div>
               :
               <div className="pt-[60px] grid sm:gap-x-4 sm:gap-y-6 gap-x-3 gap-y-6 
               xl:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 xsm:grid-cols-3 grid-cols-2">
                    {skeletonItems}
               </div>
     )
}
