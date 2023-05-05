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
          <div className="max-w-[1070px] w-full m-auto px-5">
            <div className="flex">
              <div className="w-full">
                <div className="text-black text-4xl font-bold mb-5">
                  Gain More Knowledge <br />
                  In Less Time
                </div>
                <div className="text-gray-600 text-xl font-light mb-5 leading-normal">
                  Great summaries for busy people,
                  <br />
                  individuals who barely have time to read,
                  <br />
                  and even people who don't like to read.
                </div>
                <button
                  onClick={handleOpenModal}
                  className="bg-green-400 text-black w-full h-10 rounded text-base
                  transition duration-0 hover:duration-200 hover:bg-green-500 flex items-center justify-center max-w-[300px]  "
                >
                  Login
                </button>
                {openModal && <SignIn handleCloseModal={handleCloseModal} />}
              </div>
              <div className="w-full flex justify-end  ">
                <img
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
