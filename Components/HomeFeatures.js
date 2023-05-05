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
            <div className="text-[32px] text-black text-center mb-8 font-bold">
              Understand books in few minutes
            </div>
            <div className="grid grid-cols-[repeat(3,1fr)] gap-10 mb-[96px]">
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center mb-2 text-black ">
                  <DescriptionIcon className="h-[60px] w-[60px]" />
                </div>
                <div className="text-2xl text-black mb-4 font-medium ">
                  Read or Listen
                </div>
                <div className="text-lg text-gray-600 font-light">
                  Save time by getting the core ideas from the best books.
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center mb-2 text-black ">
                  <LightbulbIcon className="h-[60px] w-[60px]" />
                </div>
                <div className="text-2xl text-black mb-4 font-medium ">
                  Find your next read
                </div>
                <div className="text-lg text-gray-600 font-light">
                  Explore book lists and personalized recommendations.
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center mb-2 text-black ">
                  <MicIcon className="h-[60px] w-[60px]" />
                </div>
                <div className="text-2xl text-black mb-4 font-medium ">
                  Briefcasts
                </div>
                <div className="text-lg text-gray-600 font-light">
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
