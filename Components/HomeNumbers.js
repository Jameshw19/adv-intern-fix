import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import SpaIcon from "@mui/icons-material/Spa";
import StarHalfIcon from "@mui/icons-material/StarHalf";

function HomeNumbers() {
  return (
    <>
      <div className="py-10 w-full">
        <div className="max-w-[1070px] w-full m-auto px-5">
          <div className="text-3xl text-[#032b41] text-center mb-8 font-bold max-md:text-2xl">
            Start growing with Summarist now
          </div>
          <div className="grid grid-cols-[repeat(3,1fr)] gap-10 max-md:gap-5 max-md:grid-cols-1">
            <div
              className="bg-[#d7e9ff] flex flex-col items-center text-center px-5
        pt-5 pb-10 rounded-xl"
            >
              <div className="flex items-center h-[60px] gap-1">
                <FavoriteIcon className="text-4xl text-[#0365f2]" />
              </div>
              <div className="text-4xl text-[#032b41] font-semibold mb-4 max-md:text-[32px] ">
                3 Million
              </div>
              <div className="text-[#032b41] font-light max-md:text-sm">
                Downloads on all platforms
              </div>
            </div>
            <div
              className="bg-[#d7e9ff] flex flex-col items-center text-center px-5
        pt-5 pb-10 rounded-xl"
            >
              <div className="flex items-center h-[60px] gap-1">
                {[...Array(4)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-[#0365f2]" />
                ))}
                <StarHalfIcon className="w-5 h-5 text-[#0365f2]" />
              </div>
              <div className="text-4xl text-[#032b41] font-semibold mb-4 max-md:text-[32px] ">
                4.5 Stars
              </div>
              <div className="text-[#032b41] font-light max-md:text-sm">
                Average ratings on iOS and Google Play
              </div>
            </div>
            <div
              className="bg-[#d7e9ff] flex flex-col items-center text-center px-5
        pt-5 pb-10 rounded-xl"
            >
              <div className="flex items-center h-[60px] gap-1">
                <SpaIcon className="text-4xl text-[#0365f2]" />
              </div>
              <div className="text-4xl text-[#032b41] font-semibold mb-4 max-md:text-[32px] ">
                97%
              </div>
              <div className="text-[#032b41] font-light max-md:text-sm">
                Of Summarist members create a better reading habit
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeNumbers;
