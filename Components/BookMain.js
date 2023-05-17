import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MicIcon from "@mui/icons-material/Mic";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { UserAuth } from "@/Components/context/AuthContext";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import { getAuth } from "firebase/auth";
import SignIn from "./SignIn";
import useFormattedAudioLength from "./AudioLength";

function BookMain({ bookData }) {
  // console.log(bookData);
  const { user } = UserAuth();
  const auth = getAuth();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { push } = useRouter();

  const [isUser, userLoading] = useAuthState(auth);
  const userIsPremiumPlus = usePremiumStatus(isUser);

  // ...
  const audioLink = bookData.audioLink;
  const formattedAudioLength = useFormattedAudioLength(audioLink);
  //...

  async function saveToLibrary(userId, bookId) {
    try {
      const docRef = await addDoc(
        collection(db, "users", userId, "SavedBooks"),
        {
          bookId: bookId,
          timestamp: serverTimestamp(),
        }
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function handleAddToLibrary() {
    if (user) {
      saveToLibrary(user.uid, bookData.id);
    } else {
      setShowModal(true);
    }
  }

  function openModal() {
    if (!user) {
      setShowModal(true);
      return null;
    }

    if (bookData.subscriptionRequired && !userIsPremiumPlus) {
      push("/choose-plan");
      return null;
    }

    push(`/player/${bookData.id}`);
    return null;
  }

  useEffect(() => {
    // Simulate loading delay of 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className="max-w-[1070px] w-full mx-auto px-5 animate pulse max-md:ml-0 max-md:w-full   ">
            <div className="py-10 w-full">
              <div className="flex gap-4 max-md:flex-col max-md:gap-8">
                <div className="w-full max-md:order-1">
                  <div className=" mb-4 h-20 w-[520px] bg-gray-200 max-md:w-[350px]  "></div>
                  <div className=" mb-4 bg-gray-200 h-10 w-[120px] max-md:w-[120px] "></div>
                  <div className="text-xl  mb-4 font-light bg-gray-200 h-10 w-[600px] max-md:w-[350px] "></div>
                  <div className="border-y-[1px] py-4 mb-5 border-y-gray-400  ">
                    <div className="flex flex-wrap max-w-[400px] gap-y-3 bg-gray-200 h-20 w-[300px] max-md:w-[200px]"></div>
                  </div>
                  <div className="flex gap-4 mb-5">
                    <button
                      className="flex items-center justify-center w-[400px] h-[48px]  
                      text-base rounded cursor-pointer gap-2 bg-gray-200 max-md:w-[200px] max-md:h-[70px] active:transform active:translate-y-[1px] "
                    ></button>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-200 w-[250px] h-10  cursor-pointer mb-10 text-lg "></div>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div
                      className="bg-gray-200 px-4 h-[48px] w-[200px] flex items-center  rounded  
                    max-md:w-[200px] max-md:h-7"
                    ></div>
                  </div>
                  <div className=" mb-4 leading-normal w-[600px] h-[288px]  bg-gray-200 max-md:w-[350px]"></div>
                  <h2 className="text-lg  mb-4 w-[200px] h-[48px]  bg-gray-200 max-md:w-[200px] max-md:h-7 "></h2>
                  <div className=" leading-normal w-[600px] h-[264px] bg-gray-200 max-md:w-[350px]"></div>
                </div>
                <div className="max-md:flex max-md:justify-center  ">
                  <div className="h-[300px] w-[300px] min-w-[300px] bg-gray-200 rounded-xl  "></div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-[1070px] w-full mx-auto px-5 max-md:ml-0 max-md:w-full">
            <div className="py-10 w-full">
              <div className="flex gap-4 max-md:flex-col max-md:gap-8">
                <div className="w-full max-md:order-1">
                  <div className="text-[#032b41] mb-4 font-semibold text-3xl max-md:text-2xl ">
                    {bookData.title}&nbsp;
                    {user ? (
                      <>
                        {!userIsPremiumPlus &&
                          bookData.subscriptionRequired && <>(Premium)</>}
                      </>
                    ) : (
                      <>{bookData.subscriptionRequired && <>(Premium)</>}</>
                    )}
                  </div>
                  <div className="text-[#032b41] mb-4 font-semibold max-md:text-sm ">
                    {bookData.author}
                  </div>
                  <div className="text-xl text-[#032b41] mb-4 font-light max-md:text-lg">
                    {bookData.subTitle}
                  </div>
                  <div className="border-y-[1px] py-4 mb-5 border-y-[#e1e7ea]">
                    <div className="flex flex-wrap max-w-[400px] gap-y-3">
                      <div className="flex items-center w-1/2 text-[#032b41] font-medium text-sm">
                        <div className="flex  h-7 w-7 mr-1 text-[#032b41] font-medium text-sm">
                          <StarBorderIcon className="w-full h-full " />
                        </div>
                        <div className=" text-[#032b41] font-medium text-sm">
                          {bookData.averageRating}
                        </div>
                        <div className=" text-[#032b41] font-medium text-sm">
                          &nbsp; ({bookData.totalRating} ratings)
                        </div>
                      </div>
                      <div className="flex items-center w-1/2 text-[#032b41] font-medium text-sm">
                        <div className="flex  h-7 w-7 mr-1 text-[#032b41] font-medium text-sm">
                          <AccessTimeIcon className="w-full h-full " />
                        </div>
                        <div className=" text-[#032b41] font-medium text-sm">
                          &nbsp; {formattedAudioLength}
                        </div>
                      </div>
                      <div className="flex items-center w-1/2 text-[#032b41] font-medium text-sm">
                        <div className="flex  h-7 w-7 mr-1 text-[#032b41] font-medium text-sm">
                          <MicIcon className="w-full h-full " />
                        </div>
                        <div className=" text-[#032b41] font-medium text-sm">
                          &nbsp; Audio & Text
                        </div>
                      </div>
                      <div className="flex items-center w-1/2 text-[#032b41] font-medium text-sm">
                        <div className="flex  h-7 w-7 mr-1 text-[#032b41] font-medium text-sm">
                          <LightbulbIcon className="w-full h-full " />
                        </div>
                        <div className=" text-[#032b41] font-medium  text-sm">
                          &nbsp; {bookData.keyIdeas} Key ideas
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mb-5">
                    <button
                      onClick={openModal}
                      className="flex items-center justify-center w-[144px] h-[48px] bg-[#032b41] text-[#fff] 
                    text-base rounded cursor-pointer gap-2 transition hover:ease-in hover:opacity-[.8] active:transform active:translate-y-[1px]"
                    >
                      <div className="flex">
                        <MenuBookIcon className="h-6 w-6" />
                      </div>
                      <div>Read</div>
                    </button>
                    {showModal && <SignIn handleCloseModal={setShowModal} />}
                    <button
                      onClick={openModal}
                      className="flex items-center justify-center w-[144px] h-[48px] bg-[#032b41] text-[#fff] 
                    text-base rounded cursor-pointer gap-2 transition hover:ease-in hover:opacity-[.8] active:transform active:translate-y-[1px]"
                    >
                      <div className="flex">
                        <MicIcon className="h-6 w-6" />
                      </div>
                      <div>Listen</div>
                    </button>
                    {showModal && <SignIn handleCloseModal={setShowModal} />}
                  </div>
                  <div
                    className="flex items-center gap-2 text-[#0365f2] font-medium cursor-pointer mb-10 text-lg 
                  transition hover:ease-in hover:text-[#044298]"
                  >
                    <div className="flex w-7 h-7 ">
                      <BookmarkIcon className="w-full h-full" />
                    </div>
                    <div onClick={handleAddToLibrary}>
                      Add title to My Library
                    </div>
                  </div>
                  <div className="text-lg text-[#032b41] mb-4 font-semibold ">
                    What's it about?
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="bg-[#f1f6f4] px-4 h-[48px] flex items-center cursor-not-allowed text-[#032b41] font-medium rounded ">
                      {bookData.tags?.[0]}
                    </div>
                    <div className="bg-[#f1f6f4] px-4 h-[48px] flex items-center cursor-not-allowed text-[#032b41] font-medium rounded ">
                      {bookData.tags?.[1]}
                    </div>
                  </div>
                  <div className="text-[#032b41] mb-4 leading-normal max-md:text-sm">
                    {bookData.bookDescription}
                  </div>
                  <h2 className="text-lg text-[#032b41] mb-4 font-semibold ">
                    About the author
                  </h2>
                  <div className="text-[#032b41] leading-normal max-md:text-sm">
                    {bookData.authorDescription}
                  </div>
                </div>
                <div className="max-md:flex max-md:justify-center">
                  <div className="h-[300px] w-[300px] min-w-[300px] ">
                    <img
                      className="w-full h-full block"
                      src={bookData.imageLink}
                      alt="bookImg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default BookMain;
