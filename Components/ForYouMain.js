import { useEffect, useState, useRef } from "react";
import Book from "./Book";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import SuggestedBook from "./SuggestedBook";
import Link from "next/link";

function ForYouMain() {
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
        );
        const data = await response.json();
        setBookData(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="max-w-5xl w-full m-auto px-5">
        <div className="py-10 w-full ">
          <div>
            <div className="text-2xl font-bold text-[#032b41] mb-4">
              Selected just for you
            </div>
            {isLoading ? (
              <>
                <div className="animate-pulse flex justify-between bg-gray-200 max-w-3xl b rounded p-6 mb-6 gap-6 w-full">
                  <div className="w-2/5  h-4"></div>
                  <div className="w-[1px] bg-gray-200"></div>
                  <div className="flex gap-4 w-3/5 ">
                    <div className="h-[140px] w-[140px] min-w-[140px] bg-gray-200"></div>
                    <div className="w-full ">
                      <div className="font-semibold text-[#032b41] mb-2 bg-gray-200 h-4"></div>
                      <div className="text-sm text-[#032b41] mb-4 bg-gray-200 h-4"></div>
                      <div className="flex items-center gap-2 ">
                        <div className="flex items-center w-10 min-w-[10px] h-10 bg-gray-200"></div>
                        <div className="text-sm font-medium text-[#032b41] bg-gray-200 h-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {bookData.map((book) => (
                  <Link href={"/book/" + book.id} key={book.id} bookData={book}>
                    <div
                      key={book.id}
                      className="flex justify-between max-w-3xl bg-[#fbefd6] rounded p-6 mb-6 gap-6 w-full 
                      max-md:p-4 max-md:w-full max-md:flex-col max-md:gap-6 "
                    >
                      <div className="text-[#032b41] w-2/5 max-md:w-full max-md:text-sm">
                        {book.subTitle}
                      </div>
                      <div className="w-[1px] bg-[#bac8ce] max-md:hidden"></div>
                      <div className="flex gap-4 w-3/5 max-md:w-full ">
                        <div className="h-[140px] w-[140px] min-w-[140px]">
                          <img src={book.imageLink} alt="bookImg" />
                        </div>
                        <div className="w-full max-md:w-full ">
                          <div className="font-semibold text-[#032b41] mb-2 ">
                            {book.title}
                          </div>
                          <div className="text-sm text-[#394547] mb-4 ">
                            {book.author}
                          </div>
                          <div className="flex items-center gap-2 ">
                            <div className="flex items-center w-10 min-w-[10px] h-10">
                              <PlayCircleRoundedIcon
                                className="w-full h-full bg-[#000] text-[#fff] flex justify-center
                      rounded-[50%] items-center py-1 pr-1 pl-[6px]  "
                              />
                            </div>
                            <div className="text-sm font-medium text-[#032b41]">
                              3 mins 23 secs
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}

            <div>
              <div className="text-2xl font-bold text-[#032b41] mb-4 ">
                Recommended For You
              </div>
              <div className="font-light   mb-4 ">
                We think you'll like these
              </div>
              <div className="flex overflow-x-auto scrollbar-hide snap-x mb-8  ">
                <Book />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#032b41] mb-4 ">
                Suggested Books
              </div>
              <div className="font-light text-[#394547] mb-4 ">
                Browse Those Books
              </div>
              <div className="flex overflow-x-auto scrollbar-hide snap-x mb-8  ">
                <SuggestedBook />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForYouMain;
