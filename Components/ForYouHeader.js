import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState, useRef } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ForYouSideBar from "./ForYouSideBar";

function ForYouHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const isInitialLoad = localStorage.getItem("isInitialLoad");
    if (isInitialLoad === null || isInitialLoad === "true") {
      localStorage.setItem("isInitialLoad", "false");
    } else {
      setIsLoadingComplete(true);
    }
  }, []);

  useEffect(() => {
    async function fetchSearchResults() {
      const response = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${searchQuery}`
      );
      const data = await response.json();
      setResults(data);
      setIsLoading(false);
      setIsLoadingComplete(true);
    }

    if (searchQuery) {
      setIsLoading(true);
      setIsLoadingComplete(false);

      // Delay the API request to simulate loading
      const timeoutId = setTimeout(() => {
        fetchSearchResults();
      }, 800);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchQuery(inputValue);
    setSearchResults(inputValue !== "");

    // Debounce search input
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        setSearchTimeout(null);
      }, 300)
    );
  };

  function handleSearchInputFocus() {
    setIsFocused(true);
  }

  function handleSearchInputBlur() {
    setIsFocused(false);
  }

  function handleClearSearch() {
    setSearchQuery("");
    setSearchResults(false);
  }

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  return (
    <>
      <div className="bg-[#fff] border-b border-[#e1e7ea] h-20 z-[1]">
        <div className="relative flex items-center justify-between px-8 max-w-[1070px] m-auto h-full   ">
          <img
            className="h-[132px] w-[132px] max-md:h-0 max-md:w-0 "
            src=""
            alt="logo"
          />
          <div className="flex items-center gap-6 max-w-[340px] w-full  ">
            <div className="flex items-center w-full">
              <div className="flex items-center w-full relative gap-2">
                <input
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchInputFocus}
                  onBlur={handleSearchInputBlur}
                  className="h-10 w-full px-4 outline-none bg-[#f1f6f4] border-2 border-[#e1e7ea] text-[#042330] rounded-lg"
                  placeholder=" Search for books"
                  type="text"
                ></input>
                <div className="flex items-center absolute h-full right-2 justify-end border-l-2 border-solid border-[#e1e7ea] pl-2">
                  {searchQuery ? (
                    <CloseIcon
                      onClick={handleClearSearch}
                      className="w-7 h-7 text-[#03314b]"
                    />
                  ) : (
                    <SearchIcon className="w-7 h-7 text-[#03314b]" />
                  )}
                </div>
              </div>
            </div>

            <div className="items-center justify-center cursor-pointer hidden max-md:flex">
              <MenuIcon onClick={toggleSidebar} className="h-7 w-7" />
            </div>
            {showSidebar && (
              <>
                <ForYouSideBar />
              </>
            )}

            {showSidebar && (
              <>
                <div
                  onClick={closeSidebar}
                  className="fixed top-0 left-0 w-full h-full bg-[#3a4649] z-[10] opacity-[.65] pointer-events-auto 
                  transition ease-in duration-[.5]"
                ></div>
              </>
            )}
          </div>
          {isLoading && searchQuery !== "" && !isLoadingComplete ? (
            <>
              <div
                className="flex flex-col max-w-[440px] w-full max-h-[640px] ml-auto overflow-y-auto p-4 absolute top-[104px] 
              right-[24px] bg-[#fff] border-[1px] border-[#e1e7ea] max-md:max-w-[unset] max-md:right-0 z-[9]"
              >
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 gap-6 h-[120px] border-b-[1px] border-b-[#e1e7ea] animate-pulse"
                  >
                    <div className="h-[110px] w-[600px] min-w-[80px] bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {searchResults && (
                <div
                  className="flex flex-col max-w-[440px] w-full max-h-[640px] ml-auto overflow-y-auto p-4 absolute top-[104px] 
                right-[24px] bg-[#fff] border-[1px] border-[#e1e7ea] max-md:max-w-[unset] max-md:right-0 z-[9]"
                >
                  {results.length === 0 ? (
                    <div className="text-base font-medium text-[#032b41]">
                      No books found
                    </div>
                  ) : (
                    results.map((book) => (
                      <Link href={"/book/" + book.id} bookData={book}>
                        <div className="flex items-center p-4 gap-6 h-[120px] border-b-[1px] border-b-[#e1e7ea] hover:bg-[#f1f6f4] ">
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
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ForYouHeader;
