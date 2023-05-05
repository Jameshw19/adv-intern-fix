import { useEffect, useState } from "react";
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
            <div className="text-2xl font-bold text-black mb-4">
              Selected Just For You
            </div>
            {isLoading ? (
              <>
                <div className="animate-pulse flex justify-between bg-gray-200 max-w-3xl b rounded p-6 mb-6 gap-6 w-full">
                  <div className="w-2/5  h-4"></div>
                  <div className="w-[1px] bg-gray-200"></div>
                  <div className="flex gap-4 w-3/5 ">
                    <div className="h-[140px] w-[140px] min-w-[140px] bg-gray-200"></div>
                    <div className="w-full ">
                      <div className="font-semibold text-black mb-2 bg-gray-200 h-4"></div>
                      <div className="text-sm text-black mb-4 bg-gray-200 h-4"></div>
                      <div className="flex items-center gap-2 ">
                        <div className="flex items-center w-10 min-w-[10px] h-10 bg-gray-200"></div>
                        <div className="text-sm font-medium text-black bg-gray-200 h-4"></div>
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
                      className="flex justify-between max-w-3xl bg-amber-100 rounded p-6 mb-6 gap-6 w-full"
                    >
                      <div className="text-black w-2/5">{book.subTitle}</div>
                      <div className="w-[1px] bg-gray-300"></div>
                      <div className="flex gap-4 w-3/5 ">
                        <div className="h-[140px] w-[140px] min-w-[140px]">
                          <img src={book.imageLink} alt="bookImg" />
                        </div>
                        <div className="w-full ">
                          <div className="font-semibold text-black mb-2 ">
                            {book.title}
                          </div>
                          <div className="text-sm text-black mb-4 ">
                            {book.author}
                          </div>
                          <div className="flex items-center gap-2 ">
                            <div className="flex items-center w-10 min-w-[10px] h-10">
                              <PlayCircleRoundedIcon
                                className="w-full h-full bg-black text-white flex justify-center
                      rounded-[50%] items-center py-1 pr-1 pl-[6px]  "
                              />
                            </div>
                            <div className="text-sm font-medium text-black">
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
              <div className="text-2xl font-bold text-black mb-4 ">
                Recommended For You
              </div>
              <div className="font-light text-black mb-4 ">
                We think You'll like these
              </div>
              <div className="flex overflow-x-auto scrollbar-hide snap-x mb-8  ">
                <Book />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-black mb-4 ">
                Suggested Books
              </div>
              <div className="font-light text-black mb-4 ">
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
