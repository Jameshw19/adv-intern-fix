import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MicIcon from "@mui/icons-material/Mic";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserAuth } from "@/Components/context/AuthContext";
import SignUp from "./SignUp";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function BookMain({ bookData, handleCloseModal }) {
  //   console.log(bookData);
  const { user } = UserAuth();
  const [showModal, setShowModal] = useState(false);
  const [userIsSubscribed, setUserIsSubscribed] = useState(false);
  // const [savedBooks, setSavedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { push } = useRouter();

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

  function handleClick() {
    if (!user) {
      setShowModal(true);
      return null;
    }

    if (bookData.subscriptionRequired && !userIsSubscribed) {
      push("/subscribe");
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
          <div className="max-w-[1070px] w-full mx-auto px-5 animate pulse">
            <div className="py-10 w-full">
              <div className="flex gap-4">
                <div className="w-full">
                  <div className=" mb-4 font-semibold text-3xl h-20 w-[300px] bg-gray-200 "></div>
                  <div className=" mb-4 font-semibold bg-gray-200 h-10 w-20 "></div>
                  <div className="text-xl  mb-4 font-light bg-gray-200 h-10 w-[600px] "></div>
                  <div className="border-y-[1px] py-4 mb-5 border-y-gray-400">
                    <div className="flex flex-wrap max-w-[400px] gap-y-3 bg-gray-200 h-20 w-[300px]"></div>
                  </div>
                  <div className="flex gap-4 mb-5">
                    <button
                      className="flex items-center justify-center w-[400px] h-[48px]  
                      text-base rounded cursor-pointer gap-2 hover:opacity-80 bg-gray-200 "
                    ></button>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-200 w-[250px] h-10  font-medium cursor-pointer mb-10 text-lg hover:opacity-75"></div>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="bg-gray-200 px-4 h-[48px] w-[300px] flex items-center cursor-not-allowed  font-medium rounded hover:opacity-80"></div>
                  </div>
                  <div className=" mb-4 leading-normal w-[600px] h-[288px]  bg-gray-200"></div>
                  <h2 className="text-lg  mb-4 font-semibold w-[600px] h-7  bg-gray-200 "></h2>
                  <div className=" leading-normal w-[600px] h-[264px] bg-gray-200"></div>
                </div>
                <div>
                  <div className="h-[300px] w-[300px] min-w-[300px] bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-[1070px] w-full mx-auto px-5">
            <div className="py-10 w-full">
              <div className="flex gap-4">
                <div className="w-full">
                  <div className="text-black mb-4 font-semibold text-3xl ">
                    {bookData.title}&nbsp;
                    {bookData.subscriptionRequired ? "(Premium)" : null}
                  </div>
                  <div className="text-black mb-4 font-semibold ">
                    {bookData.author}
                  </div>
                  <div className="text-xl text-black mb-4 font-light">
                    {bookData.subTitle}
                  </div>
                  <div className="border-y-[1px] py-4 mb-5 border-y-gray-400">
                    <div className="flex flex-wrap max-w-[400px] gap-y-3">
                      <div className="flex items-center w-1/2 text-black font-medium text-sm">
                        <div className="flex  h-7 w-7 mr-1 text-black font-medium text-sm">
                          <StarBorderIcon className="w-full h-full " />
                        </div>
                        <div className=" text-black font-medium  text-sm">
                          {bookData.averageRating}
                        </div>
                        <div className=" text-black font-medium  text-sm">
                          &nbsp; ({bookData.totalRating})
                        </div>
                      </div>
                      <div className="flex items-center w-1/2 text-black font-medium text-sm">
                        <div className="flex  h-7 w-7 mr-1 text-black font-medium text-sm">
                          <AccessTimeIcon className="w-full h-full " />
                        </div>
                        <div className=" text-black font-medium  text-sm">
                          &nbsp; 03:24
                        </div>
                      </div>
                      <div className="flex items-center w-1/2 text-black font-medium text-sm">
                        <div className="flex  h-7 w-7 mr-1 text-black font-medium text-sm">
                          <MicIcon className="w-full h-full " />
                        </div>
                        <div className=" text-black font-medium  text-sm">
                          &nbsp; Audio & Text
                        </div>
                      </div>
                      <div className="flex items-center w-1/2 text-black font-medium text-sm">
                        <div className="flex  h-7 w-7 mr-1 text-black font-medium text-sm">
                          <LightbulbIcon className="w-full h-full " />
                        </div>
                        <div className=" text-black font-medium  text-sm">
                          &nbsp; {bookData.keyIdeas} key ideas
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mb-5">
                    <button
                      onClick={handleClick}
                      className="flex items-center justify-center w-[144px] h-[48px] bg-purple-800 text-white 
                    text-base rounded cursor-pointer gap-2 hover:opacity-80"
                    >
                      <div className="flex">
                        <MenuBookIcon className="h-6 w-6" />
                      </div>
                      <div>Read</div>
                    </button>
                    {showModal && <SignUp handleCloseModal={setShowModal} />}
                    <button
                      onClick={handleClick}
                      className="flex items-center justify-center w-[144px] h-[48px] bg-purple-800 text-white 
                    text-base rounded cursor-pointer gap-2 hover:opacity-80"
                    >
                      <div className="flex">
                        <MicIcon className="h-6 w-6" />
                      </div>
                      <div>Listen</div>
                    </button>
                    {showModal && <SignUp handleCloseModal={setShowModal} />}
                  </div>
                  <div className="flex items-center gap-2 text-blue-500 font-medium cursor-pointer mb-10 text-lg hover:opacity-75">
                    <div className="flex w-7 h-7 ">
                      <BookmarkIcon className="w-full h-full" />
                    </div>
                    <div onClick={handleAddToLibrary}>
                      Add title to my library
                    </div>
                  </div>
                  <div className="text-lg text-black mb-4 font-semibold ">
                    Whats it about?
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="bg-gray-300 px-4 h-[48px] flex items-center cursor-not-allowed text-black font-medium rounded hover:opacity-80">
                      {bookData.tags?.[0]}
                    </div>
                    <div className="bg-gray-300 px-4 h-[48px] flex items-center cursor-not-allowed text-black font-medium rounded hover:opacity-80">
                      {bookData.tags?.[1]}
                    </div>
                  </div>
                  <div className="text-black mb-4 leading-normal">
                    {bookData.bookDescription}
                  </div>
                  <h2 className="text-lg text-black mb-4 font-semibold ">
                    About the author
                  </h2>
                  <div className="text-black leading-normal">
                    {bookData.authorDescription}
                  </div>
                </div>
                <div>
                  <div className="h-[300px] w-[300px] min-w-[300px]">
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
