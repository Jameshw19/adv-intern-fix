import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/link";

function ForYouHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchSearchResults() {
      const response = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${searchQuery}`
      );
      const data = await response.json();
      setResults(data);
    }
    if (searchQuery) {
      fetchSearchResults();
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
    setSearchResults(event.target.value !== "");

    // debounce search input
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        setSearchTimeout(null);
      }, 300)
    );
  }

  return (
    <>
      <div className="bg-white border-b h-20 z-[1]   ">
        <div className="relative flex items-center justify-between px-8 max-w-[1070px] m-auto h-full  ">
          <img
            className="h-[132px] w-[132px] "
            // src="https://cdn.dribbble.com/users/846370/screenshots/6761160/logo_1501.jpg "
            alt="logo"
          />
          <div className="flex items-center gap-6 max-w-[340px] w-full ">
            <div className="flex items-center w-full">
              <div className="flex items-center w-full relative gap-2">
                <input
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="h-10 w-full px-4 outline-none bg-gray-100 border-2 border-gray-200 text-black rounded-lg"
                  placeholder=" Search For Books"
                  type="text"
                ></input>
                <div className="flex items-center absolute h-full right-2 justify-end border-l-2 border-solid border-gray-200 pl-2">
                  <SearchIcon className="w-7 h-7 text-black" />
                </div>
              </div>
            </div>
          </div>
          {searchResults && (
            <div
              className="flex flex-col max-w-[440px] w-full max-h-[640px] ml-auto overflow-y-auto p-4 absolute top-[104px] 
             right-[24px] bg-white border-[1px] border-[#e1e7ea]"
            >
              {results.length === 0 ? (
                <div className="text-base font-medium text-[#032b41]">
                  No books found
                </div>
              ) : (
                results.map((book) => (
                  <Link href={"/book/" + book.id} bookData={book}>
                    <div className="flex items-center p-4 gap-6 h-[120px] border-b-[1px] border-b-[#e1e7ea] ">
                      <div className="h-20 w-20 min-w-[80px]">
                        <img src={book.imageLink} alt="" />
                      </div>
                      <div>
                        <div className="text-base font-medium text-[#032b41] mb-2">
                          {book.title}
                        </div>
                        <div className="text-sm font-light text-[#6b757b] mb-2">
                          {book.author}
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-sm font-light text-[#6b757b] ">
                            <div className="flex w-4 h-4">
                              <AccessTimeIcon className="w-full h-full" />
                            </div>
                            <div>03:02</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ForYouHeader;
