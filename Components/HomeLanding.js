import { useState } from "react";
import SignIn from "./SignIn";

function HomeLanding() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  //

  return (
    <>
      <div>
        <div className="py-10 w-full">
          <div className="max-w-[1070px] w-full m-auto px-6">
            <div className="flex">
              <div className="w-full max-md:flex max-md:flex-col max-md:items-center max-md:text-center max-md:max-w-[540px] max-md:m-auto">
                <div className="text-[#032b41] text-[40px] font-bold mb-6 max-md:text-2xl max-md:text-center">
                  Gain more knowledge <br className="max-md:hidden" /> in less
                  time
                </div>
                <div className="text-[#394547] text-xl font-light mb-6 leading-normal max-md:text-center">
                  Great summaries for busy people,
                  <br className="max-md:hidden" />
                  individuals who barely have time to read,
                  <br className="max-md:hidden" />
                  and even people who don't like to read.
                </div>
                <button
                  onClick={handleOpenModal}
                  className="bg-[#2bd97c] text-[#032b41] w-full flex items-center justify-center max-w-[300px] h-10 rounded text-base
                  transition hover:bg-[#20ba68] hover:ease-in   "
                >
                  Login
                </button>
                {openModal && <SignIn handleCloseModal={handleCloseModal} />}
              </div>
              <div className="w-full flex justify-end max-md:hidden">
                <img
                  className="max-w-[400px] w-full h-full"
                  src="https://summarist.vercel.app/_next/static/media/landing.e4787d01.png"
                  alt="landing"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeLanding;
