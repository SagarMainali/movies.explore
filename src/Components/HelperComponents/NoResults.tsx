
export function NoResults({ searchQuery }: { searchQuery: string | undefined }) {
     return (
          <div className="h-[96vh] w-full flex flex-col gap-1 justify-center items-center">

               <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M59.2962 96.918V92.1741V79.6235C59.2962 78.2905 58.2156 77.2099 56.8826 77.2099H6.88438C5.5514 77.2099 4.47081 78.2905 4.47081 79.6235V87.0639" stroke="#A6A9AD" stroke-width="1.44814" stroke-linecap="round" />
                    <path d="M32.7018 82.5474H9.38056" stroke="#CECFD2" stroke-width="2.41357" stroke-linecap="round" />
                    <path d="M42.3333 87.4745L12.8748 87.4745" stroke="#CECFD2" stroke-width="2.41357" stroke-linecap="round" />
                    <path d="M47.0219 92.4015L23.4573 92.4015" stroke="#CECFD2" stroke-width="2.41357" stroke-linecap="round" />
                    <rect x="46.2035" y="80.084" width="8.59203" height="8.62229" rx="2.41357" fill="#D9D9D9" />
                    <path d="M105.939 20.932V28.3724C105.939 29.7054 104.858 30.786 103.525 30.786H53.5268C52.1938 30.786 51.1132 29.7054 51.1132 28.3724V13.4915C51.1132 12.1585 52.1938 11.0779 53.5268 11.0779H57.6098" stroke="#A6A9AD" stroke-width="1.44814" stroke-linecap="round" />
                    <path d="M99.9397 16.4155H61.6985" stroke="#CECFD2" stroke-width="2.41357" stroke-linecap="round" />
                    <path d="M99.9397 21.3425L79.4962 21.3425" stroke="#CECFD2" stroke-width="2.41357" stroke-linecap="round" />
                    <path d="M99.9397 26.2696L87.4331 26.2695" stroke="#CECFD2" stroke-width="2.41357" stroke-linecap="round" />
                    <rect width="12.0467" height="5.78243" transform="matrix(0.705863 0.708348 -0.705863 0.708348 85.6294 74.0586)" fill="#A6A9AD" />
                    <rect width="3.37308" height="5.78243" transform="matrix(0.705863 0.708348 -0.705863 0.708348 85.6294 74.0586)" fill="#74767C" />
                    <path d="M91.0704 78.8384C91.4467 78.4607 92.0569 78.4607 92.4333 78.8384L120.658 107.163C122.164 108.674 122.164 111.123 120.658 112.634L119.988 113.307C118.482 114.818 116.041 114.818 114.536 113.307L86.3109 84.9824C85.9345 84.6047 85.9345 83.9923 86.3109 83.6146L91.0704 78.8384Z" fill="#74767C" />
                    <path d="M90.7302 81.2277C91.1066 80.85 91.7168 80.85 92.0931 81.2277L119.473 108.704C119.942 109.175 119.942 109.939 119.473 110.41C119.003 110.882 118.242 110.882 117.772 110.41L90.3925 82.9343C90.0161 82.5567 90.0161 81.9443 90.3925 81.5666L90.7302 81.2277Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M85.119 77.3011C72.4391 90.0256 51.8809 90.0256 39.201 77.3011C36.0493 74.1383 33.681 70.487 32.0961 66.5901H38.9935C40.1865 68.8458 41.7296 70.9639 43.6227 72.8638C53.8606 83.1377 70.4594 83.1377 80.6973 72.8638C90.9351 62.5899 90.9351 45.9326 80.6973 35.6587C70.4594 25.3848 53.8606 25.3848 43.6227 35.6587C41.3186 37.9709 39.5331 40.6065 38.2661 43.4198H31.5331C33.0954 38.9654 35.6513 34.7836 39.201 31.2214C51.8809 18.4968 72.4391 18.4968 85.119 31.2214C97.7989 43.9459 97.7989 64.5765 85.119 77.3011Z" fill="#A6A9AD" />
                    <path d="M44.3817 43.4198H20.5799C19.2469 43.4198 18.1663 44.5004 18.1663 45.8334V64.1766C18.1663 65.5096 19.2469 66.5901 20.5799 66.5901H49.4324M57.6098 43.4198H80.2096C81.5425 43.4198 82.6231 44.5004 82.6231 45.8334V64.1766C82.6231 65.5096 81.5425 66.5901 80.2096 66.5901H74.9266" stroke="#A6A9AD" stroke-width="1.44814" stroke-linecap="round" />
                    <path d="M68.1925 48.247L73.4837 53.5568M73.4837 48.247L68.1925 53.5568" stroke="#BD1313" stroke-width="2.41357" stroke-linecap="round" />
                    <path d="M51.3568 49.6951H23.9385" stroke="#CECFD2" stroke-width="2.41357" stroke-linecap="round" />
                    <path d="M58.5721 55.4877L23.9385 55.4877" stroke="#CECFD2" stroke-width="2.41357" stroke-linecap="round" />
                    <path d="M68.1925 61.2803L23.9386 61.2803" stroke="#CECFD2" stroke-width="2.41357" stroke-linecap="round" />
               </svg>

               <h1 className="text-center">
                    Your search query '<i>{searchQuery}</i>' didn't match any movies or shows.<br />Please try again with another keyword
               </h1>

          </div>
     )
}
