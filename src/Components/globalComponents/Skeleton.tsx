import '../../styles/skeleton.css'

export function Skeleton({ containerType }: { containerType: string }) {

     const screenWidth = window.screen.width

     let noOfskeletonItems = 0
     let skeletonItems = []

     if (screenWidth >= 1300) noOfskeletonItems = 7
     else if (screenWidth < 1300 && screenWidth >= 1080) noOfskeletonItems = 6
     else if (screenWidth < 1080 && screenWidth >= 860) noOfskeletonItems = 5
     else if (screenWidth < 860 && screenWidth >= 620) noOfskeletonItems = 4
     else noOfskeletonItems = 3

     let i
     for (i = 0; i < noOfskeletonItems; i++) {
          skeletonItems.push(
               <div key={i} className={`rounded-xl overflow-hidden flex flex-col gap-1
                    ${containerType === 'category' || containerType === 'similarCategory'
                         ? `xl:min-w-[calc((100%/7)-10.3px)]
                         lg:min-w-[calc((100%/6)-10.3px)] 
                         md:min-w-[calc((100%/5)-10.3px)] 
                         sm:min-w-[calc((100%/4)-6px)]
                         min-w-[calc((100%/3)-5px)]`
                         : ''} `}>

                    <div className={`effect-skeleton
                              ${containerType === 'category'
                              ? 'w-[100%] xl:h-[280px] lg:h-[270px] md:h-[270px] sm:h-[260px] xsm:h-[250px] xxsm:h-[170px] h-[145px]'
                              : containerType === 'similarCategory'
                                   ? 'w-[100%] xl:h-[255px] lg:h-[240px] md:h-[265px] sm:h-[260px] xsm:h-[250px] xxsm:h-[170px] h-[145px]'
                                   : 'lg:h-[350px] md:h-[280px] sm:h-[260px] xsm:h-[280px] h-[300px]'}`} >
                    </div>

                    <h1 className="mc:h-[50px] h-[40px] effect-skeleton"> </h1>
               </div>
          )
     }

     return (
          <div className="hide-scrollbar flex md:gap-[12px] gap-[8px] overflow-x-scroll">
               {skeletonItems}
          </div>
     )
}
