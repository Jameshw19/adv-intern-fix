import { useEffect, useState } from "react";

function HomeFeaturesText() {
  const [greenIndex, setGreenIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGreenIndex((greenIndex) => (greenIndex + 1) % titles.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const titles = [
    "Enhance your Knowledge",
    "Achieve greater success",
    "Improve your health",
    "Develop better parenting skills",
    "Increase happiness",
    "Be the best version of yourself!",
  ];

  const titles1 = [
    "Expand your learning",
    "Accomplish your goals",
    "Strengthen your vitality",
    "Become a better caregiver",
    "Improve your mood",
    "Maximize your abilities",
  ];

  return (
    <>
      <div className="flex gap-[80px] mb-[96px] ">
        <div className="w-full flex flex-col justify-center">
          {titles.map((title, index) => (
            <div
              key={title}
              className={`text-[32px] font-medium mb-4 ${
                index === greenIndex ? "text-[#2bd97c]" : "text-[#6b757b]"
              }`}
            >
              {title}
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col justify-center gap-5 bg-gray-200 py-10 px-5">
          <div className="flex gap-4 ">
            <div className="text-blue-600 text-xl font-semibold mt-1 ">93%</div>
            <div className="text-xl font-light text-gray-700">
              of Summarist members <b>significantly increase</b> reading
              frequency.
            </div>
          </div>
          <div className="flex gap-4 ">
            <div className="text-blue-600 text-xl font-semibold mt-1 ">96%</div>
            <div className="text-xl font-light text-gray-700">
              of Summarist members <b>establish better</b> habits.
            </div>
          </div>
          <div className="flex gap-4 ">
            <div className="text-blue-600 text-xl font-semibold mt-1 ">90%</div>
            <div className="text-xl font-light text-gray-700">
              have made <b>significant positive</b> change to their lives.
            </div>
          </div>
        </div>
      </div>
      {/* part 2 */}
      <div className="flex gap-[80px] mb-[96px] ">
        <div className="w-full flex flex-col justify-center gap-5 bg-gray-200 py-10 px-5">
          <div className="flex gap-4 ">
            <div className="text-blue-600 text-xl font-semibold mt-1 ">91%</div>
            <div className="text-xl font-light text-gray-700">
              of Summarist members <b>report feeling more productive</b> after
              incorporating the service into their daily routine.
            </div>
          </div>
          <div className="flex gap-4 ">
            <div className="text-blue-600 text-xl font-semibold mt-1 ">94%</div>
            <div className="text-xl font-light text-gray-700">
              of Summarist members have <b>noticed an improvement</b> in their
              overall comprehension and retention of information.
            </div>
          </div>
          <div className="flex gap-4 ">
            <div className="text-blue-600 text-xl font-semibold mt-1 ">88%</div>
            <div className="text-xl font-light text-gray-700">
              of Summarist members <b>feel more informed</b> about current
              events and industry trends since using the platform.
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-end">
          {titles1.map((title, index) => (
            <div
              key={title}
              className={`text-[32px] font-medium mb-4 ${
                index === greenIndex ? "text-[#2bd97c]" : "text-[#6b757b]"
              }`}
            >
              {title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomeFeaturesText;
