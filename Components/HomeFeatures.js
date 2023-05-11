import DescriptionIcon from "@mui/icons-material/Description";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MicIcon from "@mui/icons-material/Mic";
import HomeFeaturesText from "./HomeFeaturesText";

function HomeFeatures() {
  return (
    <>
      <div>
        <div className="py-10 w-full">
          <div className="max-w-[1070px] w-full m-auto px-5">
            <div className="text-[32px] text-[#032b41] text-center mb-8 font-bold max-md:text-2xl">
              Understand books in few minutes
            </div>
            <div className="grid grid-cols-[repeat(3,1fr)] gap-10 mb-[96px] max-md:grid-cols-1">
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center mb-2 text-[#032b41] ">
                  <DescriptionIcon className="h-[60px] w-[60px] max-md:h-[48px] max-md:w-[48px]" />
                </div>
                <div className="text-2xl text-[#032b41] mb-4 font-medium max-md:text-xl ">
                  Read or Listen
                </div>
                <div className="text-lg text-[#394547] font-light max-md:text-sm ">
                  Save time by getting the core ideas from the best books.
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center mb-2 text-[#032b41]  ">
                  <LightbulbIcon className="h-[60px] w-[60px] max-md:h-[48px] max-md:w-[48px]" />
                </div>
                <div className="text-2xl text-[#032b41] mb-4 font-medium max-md:text-xl  ">
                  Find your next read
                </div>
                <div className="text-lg text-[#394547] font-light  max-md:text-sm ">
                  Explore book lists and personalized recommendations.
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center mb-2 text-[#032b41] ">
                  <MicIcon className="h-[60px] w-[60px] max-md:h-[48px] max-md:w-[48px]" />
                </div>
                <div className="text-2xl text-[#032b41] mb-4 font-medium max-md:text-xl ">
                  Briefcasts
                </div>
                <div className="text-lg text-[#394547] font-light  max-md:text-sm ">
                  Gain valuable insights from briefcasts
                </div>
              </div>
            </div>
            <HomeFeaturesText />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeFeatures;
