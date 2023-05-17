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
          <div className="text-3xl text-[#032b41] text-center mb-8 font-bold max-md:text-2xl">
            What our members say
          </div>
          <div className="max-w-[600px] m-auto">
            <div className="bg-[#fff3d7] p-4 mb-8 rounded font-light">
              <div className="text-[#032b41] flex gap-2 mb-2">
                <div>Hanna M.</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-[#0564f1]" />
                  ))}
                </div>
              </div>
              <div className="text-[#394547] tracking-[0.3px] leading-normal max-md:text-sm">
                This app has been a <b className="font-bold"> game-changer</b>{" "}
                for me! It's saved me so much time and effort in reading and
                comprehending books. Highly recommend it to all book lovers.
              </div>
            </div>
            <div className="bg-[#fff3d7] p-4 mb-8 rounded font-light">
              <div className="text-[#032b41] flex gap-2 mb-2">
                <div>David B.</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-[#0564f1]" />
                  ))}
                </div>
              </div>
              <div className="text-[#394547] tracking-[0.3px] leading-normal max-md:text-sm">
                I love this app! It provides
                <b className="font-bold"> concise and accurate summaries</b> of
                books in a way that is easy to understand. It's also very
                user-friendly and intuitive.
              </div>
            </div>
            <div className="bg-[#fff3d7] p-4 mb-8 rounded font-light">
              <div className="text-[#032b41] flex gap-2 mb-2">
                <div>Nathan S.</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-[#0564f1]" />
                  ))}
                </div>
              </div>
              <div className="text-[#394547] tracking-[0.3px] leading-normal max-md:text-sm">
                This app is a great way to get the main takeaways from a book
                without having to read the entire thing.
                <b className="font-bold">
                  The summaries are well-written and informative.
                </b>
                Definitely worth downloading.
              </div>
            </div>
            <div className="bg-[#fff3d7] p-4 mb-8 rounded font-light">
              <div className="text-[#032b41] flex gap-2 mb-2">
                <div>Ryan R.</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-[#0564f1]" />
                  ))}
                </div>
              </div>
              <div className="text-[#394547] tracking-[0.3px] leading-normal max-md:text-sm">
                If you're a busy person who{" "}
                <b className="font-bold">
                  loves reading but doesn't have the time{" "}
                </b>{" "}
                to read every book in full, this app is for you! The summaries
                are thorough and provide a great overview of the book's content.
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleOpenModal}
              className="cursor-pointer max-w-[300px] items-center justify-center bg-[#2bd97c]
        text-[#032b41] w-full h-10 rounded text-base
        flex min-w-[180px] transition hover:bg-[#20ba68] hover:ease-in active:transform active:translate-y-[1px]"
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
