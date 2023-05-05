import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import { useEffect, useState } from "react";
import { BOOKS_URL } from "./API";
import Link from "next/link";

function Book() {
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${BOOKS_URL}recommended`);
      const data = await res.json();
      setBookData(data);
      // console.log(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Simulate loading delay of 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {bookData.map((book) => (
        <div
          key={book.id}
          className="relative snap-start pt-[32px] pr-[12px] pl-[12px] pb-[12px] no-underline rounded max-w-[200px] w-full"
        >
          {isLoading ? (
            <>
              <div className="bg-gray-300 h-[172px] mb-2"></div>
              <div className="bg-gray-300 h-4 rounded mb-1"></div>
              <div className="bg-gray-300 h-3 rounded mb-1"></div>
              <div className="bg-gray-300 h-3 rounded mb-1"></div>
              <div className="flex gap-2">
                <div className="flex items-center gap-1 text-sm font-light text-gray-400">
                  <div className="bg-gray-300 w-4 h-4 rounded-full"></div>
                  <div className="bg-gray-300 h-4 w-8 rounded"></div>
                </div>
                <div className="flex items-center gap-1 text-sm font-light text-gray-400">
                  <div className="bg-gray-300 w-4 h-4 rounded-full"></div>
                  <div className="bg-gray-300 h-4 w-8 rounded"></div>
                </div>
              </div>
            </>
          ) : (
            <Link href={"/book/" + book.id} bookData={book}>
              <div>
                {book.subscriptionRequired ? (
                  <div className="bg-black w-fit h-[18px] px-2 absolute top-0 right-0 text-white text-xs flex items-center rounded-3xl">
                    Premium
                  </div>
                ) : null}
                <div className="mb-2 w-[172px] h-[172px]">
                  <img src={book.imageLink} alt="bookImg" />
                </div>
                <div className="text-base font-bold text-black mb-2 ">
                  {book.title}
                </div>
                <div className="text-sm text-gray-400 font-light mb-2  ">
                  {book.author}
                </div>
                <div className="text-sm text-black mb-2 ">{book.subTitle}</div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 text-sm font-light text-gray-400 ">
                    <div className="flex w-4 h-4 ">
                      <AccessTimeRoundedIcon className="w-full h-full " />
                    </div>
                    <div>03:24</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-light text-gray-400">
                    <div className="flex w-4 h-4 ">
                      <StarOutlineOutlinedIcon className="w-full h-full" />
                    </div>
                    <div>{book.averageRating}</div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      ))}
    </>
  );
}

export default Book;
