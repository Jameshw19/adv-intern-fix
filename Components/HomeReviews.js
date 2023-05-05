import StarIcon from "@mui/icons-material/Star";
import SignIn from "./SignIn";
import { useState } from "react";

function HomeReviews() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="max-w-[1070px] w-full m-auto px-5">
        <div className="py-10 w-full">
          <div className="text-3xl text-black text-center mb-8 font-bold">
            What our members say
          </div>
          <div className="max-w-[600px] m-auto">
            <div className="bg-yellow-100 p-4 mb-8 rounded font-light">
              <div className="text-black flex gap-2 mb-2">
                <div>Hanna M.</div>
                <div className="flex">
                  <StarIcon className="w-5 h-5 text-blue-700" />
                </div>
              </div>
              <div className="text-gray-600 tracking-[0.3px] leading-normal">
                This app has been a <b>game-changer</b> for me! It's saved me so
                much time and effort in reading and comprehending books. Highly
                recommend it to all book lovers.
              </div>
            </div>
            <div className="bg-yellow-100 p-4 mb-8 rounded font-light">
              <div className="text-black flex gap-2 mb-2">
                <div>David B.</div>
                <div className="flex">
                  <StarIcon className="w-5 h-5 text-blue-700" />
                </div>
              </div>
              <div className="text-gray-600 tracking-[0.3px] leading-normal">
                I love this app! It provides
                <b>concise and accurate summaries</b> of books in a way that is
                easy to understand. It's also very user-friendly and intuitive.
              </div>
            </div>
            <div className="bg-yellow-100 p-4 mb-8 rounded font-light">
              <div className="text-black flex gap-2 mb-2">
                <div>Nathan S.</div>
                <div className="flex">
                  <StarIcon className="w-5 h-5 text-blue-700" />
                </div>
              </div>
              <div className="text-gray-600 tracking-[0.3px] leading-normal">
                This app is a great way to get the main takeaways from a book
                without having to read the entire thing.
                <b>The summaries are well-written and informative.</b>
                Definitely worth downloading.
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleOpenModal}
              className="cursor-pointer max-w-[300px] items-center justify-center bg-green-400
        text-black w-full h-10 rounded text-base transition-200 duration-0 hover:duration-200 hover:bg-green-500
        flex min-w-[180px]"
            >
              Login
            </button>
            {openModal && <SignIn handleCloseModal={handleCloseModal} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeReviews;
