import { useState } from "react";
import SignIn from "./SignIn";

function Header() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="h-20">
        <div className="flex justify-between items-center max-w-[1070px] w-full h-full m-auto px-6 py-0">
          <figure className="max-w-[200px]">
            <img
              className="w-full h-full"
              src="https://summarist.vercel.app/_next/static/media/logo.1b1c490b.png"
              alt="logo"
            />
          </figure>
          <ul className="list-none flex gap-6">
            <li
              onClick={handleOpenModal}
              className="text-[#032b41] cursor-pointer hover:text-[#2bd97c] "
            >
              Login
            </li>
            {openModal && <SignIn handleCloseModal={handleCloseModal} />}

            <li className="text-[#032b41] cursor-not-allowed max-sm:hidden">
              About
            </li>
            <li className="text-[#032b41] cursor-not-allowed max-sm:hidden">
              Contact
            </li>
            <li className="text-[#032b41] cursor-not-allowed max-sm:hidden">
              Help
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
