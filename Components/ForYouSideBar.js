import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth, signOut } from "firebase/auth";
import app from "@/firebase";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import SignIn from "./SignIn";
import { UserAuth } from "@/Components/context/AuthContext";
import Link from "next/link";

function ForYouSideBar() {
  const auth = getAuth(app);
  const { user, logOut } = UserAuth();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const [selectedTag, setSelectedTag] = useState(null);
  const { id } = router.query;
  const currentPage = `/player/${id}`;

  // console.log("Current Page:", currentPage);
  // console.log("ID:", id);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const path = router.asPath;
    const forYouPagePath = "/foryoupage";
    const libraryPath = "/library";
    const settingsPath = "/settings";

    if (path === forYouPagePath) {
      setSelectedTag(forYouPagePath);
    } else if (path === libraryPath) {
      setSelectedTag(libraryPath);
    } else if (path === settingsPath) {
      setSelectedTag(settingsPath);
    } else {
      setSelectedTag(null);
    }
  }, [router.asPath, router.isReady]);

  // console.log("selectedTag:", selectedTag);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogOut = async () => {
    try {
      await logOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {user ? (
        <div
          className="bg-[#f7faf9] w-[200px] min-w-[200px] fixed top-0 left-0 h-screen z-[9999] transition-all duration-[.3]   
          max-md:w-[80%] max-md:translate-x-[0]  "
        >
          <div className="flex items-center justify-center pt-4 h-[60px] max-w-[160px] m-auto ">
            <img
              className="w-full h-10"
              src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.1b1c490b.png&w=1080&q=75
              "
              alt="Logo"
            />
          </div>
          <div
            className={`flex flex-col justify-between pb-5 overflow-y-auto ${
              currentPage === router.asPath
                ? "h-[calc(100vh-140px)] max-md:h-[calc(100vh-240px)]  "
                : "h-[calc(100vh-60px)] max-md:h-[calc(100vh-60px)]  "
            }`}
          >
            <div className="flex-1 mt-10 ">
              <Link href="/foryoupage">
                <div className="flex items-center h-[56px] text-black mb-2 cursor-pointer hover:bg-[#f0efef]">
                  <div
                    className={` w-[5px] h-full mr-4 ${
                      selectedTag === "/foryoupage" ? `bg-green-400` : ""
                    }`}
                  ></div>
                  <div className="flex items-center justify-center mr-2 ">
                    <HomeOutlinedIcon className="h-7 w-7" />
                  </div>
                  <div>For You</div>
                </div>
              </Link>

              <Link href="/library">
                <div className="flex items-center h-[56px] text-black mb-2 cursor-pointer hover:bg-[#f0efef]">
                  <div
                    className={`w-[5px] h-full mr-4 ${
                      selectedTag === "/library" ? `bg-green-400` : ""
                    }`}
                  ></div>
                  <div className="flex items-center justify-center mr-2 ">
                    <BookmarkBorderOutlinedIcon className="h-7 w-7" />
                  </div>
                  <div>My Library</div>
                </div>
              </Link>

              <div className="cursor-not-allowed flex items-center h-[56px] text-black mb-2">
                <div className="w-[5px] h-full bg-transparent mr-4"></div>
                <div className="flex items-center justify-center mr-2 ">
                  <CreateOutlinedIcon className="h-7 w-7" />
                </div>
                <div>Highlights</div>
              </div>
              <div className="cursor-not-allowed flex items-center h-[56px] text-black mb-2">
                <div className="w-[5px] h-full bg-transparent mr-4"></div>
                <div className="flex items-center justify-center mr-2 ">
                  <SearchOutlinedIcon className="h-7 w-7" />
                </div>
                <div>Search</div>
              </div>
            </div>
            <div>
              <Link href="/settings">
                <div className="flex items-center h-[56px] text-black mb-2 cursor-pointer hover:bg-[#f0efef]">
                  <div
                    className={`w-[5px] h-full mr-4 ${
                      selectedTag === "/settings" ? `bg-green-400` : ""
                    }`}
                  ></div>
                  <div className="flex items-center justify-center mr-2">
                    <SettingsOutlinedIcon className="h-7 w-7" />
                  </div>
                  <div>Settings</div>
                </div>
              </Link>

              <div className="cursor-not-allowed flex items-center h-[56px] text-black mb-2">
                <div className="w-[5px] h-full bg-transparent mr-4"></div>
                <div className="flex items-center justify-center mr-2">
                  <HelpOutlineOutlinedIcon className="h-7 w-7" />
                </div>
                <div>Help & Support</div>
              </div>
              <div
                onClick={handleLogOut}
                className="cursor-pointer flex items-center h-[56px] text-black mb-0 hover:bg-[#f0efef]"
              >
                <div className="w-[5px] h-full bg-transparent mr-4"></div>
                <div className="flex items-center justify-center mr-2">
                  <LogoutIcon className="h-7 w-7" />
                </div>
                <div>Logout</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="bg-[#f7faf9] w-[200px] min-w-[200px] fixed top-0 left-0 h-screen z-[1000] transition-all duration-[.3]
          max-md:w-[80%] max-md:translate-x-[0] "
          >
            <div className="flex items-center justify-center h-[60px] max-w-[160px] pt-4 m-auto ">
              <img
                className="w-full h-10"
                src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.1b1c490b.png&w=1080&q=75"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-between pb-5 h-[calc(100vh-60px)] overflow-y-auto ">
              <div className="flex-1 mt-10 ">
                <Link href="/foryoupage">
                  <div className="flex items-center h-[56px] text-black mb-2 cursor-pointer hover:bg-[#f0efef]">
                    <div
                      className={`w-[5px] h-full mr-4 ${
                        selectedTag === "/foryoupage" ? `bg-green-400` : ""
                      }`}
                    ></div>
                    <div className="flex items-center justify-center mr-2 ">
                      <HomeOutlinedIcon className="h-7 w-7" />
                    </div>
                    <div>For You</div>
                  </div>
                </Link>
                <Link href="/library">
                  <div className="flex items-center h-[56px] text-black mb-2 cursor-pointer hover:bg-[#f0efef]">
                    <div
                      className={`w-[5px] h-full mr-4 ${
                        selectedTag === "/library" ? `bg-green-400` : ""
                      }`}
                    ></div>
                    <div className="flex items-center justify-center mr-2 ">
                      <BookmarkBorderOutlinedIcon className="h-7 w-7" />
                    </div>
                    <div>My Library</div>
                  </div>
                </Link>

                <div className="cursor-not-allowed flex items-center h-[56px] text-black mb-2">
                  <div className="w-[5px] h-full bg-transparent mr-4"></div>
                  <div className="flex items-center justify-center mr-2 ">
                    <CreateOutlinedIcon className="h-7 w-7" />
                  </div>
                  <div>Highlights</div>
                </div>
                <div className="cursor-not-allowed flex items-center h-[56px] text-black mb-2">
                  <div className="w-[5px] h-full bg-transparent mr-4"></div>
                  <div className="flex items-center justify-center mr-2 ">
                    <SearchOutlinedIcon className="h-7 w-7" />
                  </div>
                  <div>Search</div>
                </div>
              </div>
              <Link href="/settings">
                <div>
                  <div className="flex items-center h-[56px] text-black mb-2 cursor-pointer hover:bg-[#f0efef]">
                    <div
                      className={`w-[5px] h-full mr-4 ${
                        selectedTag === "/settings" ? `bg-green-400` : ""
                      }`}
                    ></div>
                    <div className="flex items-center justify-center mr-2">
                      <SettingsOutlinedIcon className="h-7 w-7" />
                    </div>
                    <div>Settings</div>
                  </div>
                  <div className="cursor-not-allowed flex items-center h-[56px] text-black mb-2">
                    <div className="w-[5px] h-full bg-transparent mr-4"></div>
                    <div className="flex items-center justify-center mr-2">
                      <HelpOutlineOutlinedIcon className="h-7 w-7" />
                    </div>
                    <div>Help & Support</div>
                  </div>
                  <div
                    onClick={handleOpenModal}
                    className="cursor-pointer flex items-center h-[56px] text-black mb-0 hover:bg-[#f0efef]"
                  >
                    <div className="w-[5px] h-full bg-transparent mr-4"></div>
                    <div className="flex items-center justify-center mr-2">
                      <LogoutIcon className="h-7 w-7" />
                    </div>
                    <div>Login</div>
                  </div>
                  {openModal && <SignIn handleCloseModal={handleCloseModal} />}
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ForYouSideBar;
