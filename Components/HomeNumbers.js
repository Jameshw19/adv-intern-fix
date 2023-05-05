import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import SpaIcon from "@mui/icons-material/Spa";

function HomeNumbers() {
  return (
    <>
      <div className="py-10 w-full">
        <div className="max-w-[1070px] w-full m-auto px-5">
          <div className="text-3xl text-black text-center mb-8 font-bold">
            Start growing with Summarist now
          </div>
          <div className="grid grid-cols-[repeat(3,1fr)] gap-10">
            <div
              className="bg-blue-100 flex flex-col items-center text-center px-5
        pt-5 pb-10 rounded-xl"
            >
              <div className="flex items-center h-[60px] gap-1">
                <FavoriteIcon className="text-4xl text-blue-500" />
              </div>
              <div className="text-4xl text-black font-semibold mb-4 ">
                3 Million
              </div>
              <div className="text-black font-light">
                Downloads on all platforms
              </div>
            </div>
            <div
              className="bg-blue-100 flex flex-col items-center text-center px-5
        pt-5 pb-10 rounded-xl"
            >
              <div className="flex items-center h-[60px] gap-1">
                <StarIcon className="text-4xl text-blue-500 " />
              </div>
              <div className="text-4xl text-black font-semibold mb-4 ">
                4.5 Stars
              </div>
              <div className="text-black font-light">
                Average ratings on iOS and Google Play
              </div>
            </div>
            <div
              className="bg-blue-100 flex flex-col items-center text-center px-5
        pt-5 pb-10 rounded-xl"
            >
              <div className="flex items-center h-[60px] gap-1">
                <SpaIcon className="text-4xl text-blue-500" />
              </div>
              <div className="text-4xl text-black font-semibold mb-4 ">97%</div>
              <div className="text-black font-light">
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
