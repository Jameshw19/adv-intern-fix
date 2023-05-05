import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { getAuth, signOut } from "firebase/auth";
import app from "@/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SignIn from "./SignIn";
import { UserAuth } from "@/Components/context/AuthContext";

function ForYouSideBar() {
  const auth = getAuth(app);
  const { user, logOut } = UserAuth();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const [selectedTag, setSelectedTag] = useState(null);

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

  console.log("selectedTag:", selectedTag);

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
  // <div className="bg-gray-[#f7faf9] w-[200px] min-w-[200px] fixed top-0 left-0 h-screen z-[1000] transition-all">
  return (
    <>
      {user ? (
        <div className="bg-[#f7faf9] w-[200px] min-w-[200px] fixed top-0 left-0 h-screen z-[1000] transition-all">
          <div className="flex items-center justify-center pt-4 h-[60px] max-w-[160px] m-auto ">
            <img
              className="w-full h-10"
              // src=""
              alt="Logo"
            />
          </div>
          <div className="flex flex-col justify-between pb-5 h-[calc(100vh-60px)] overflow-y-auto">
            <div className="flex-1 mt-10 ">
              <a
                href="/foryoupage"
                className="flex items-center h-[56px] text-black mb-2 cursor-pointer hover:bg-[#f0efef]"
                // onClick={() => handleTagClick("foryoupage")}
              >
                <div
                  className={` w-[5px] h-full mr-4 ${
                    selectedTag === "/foryoupage" ? `bg-green-400` : ""
                  }`}
                ></div>
                <div className="flex items-center justify-center mr-2 ">
                  <HomeOutlinedIcon className="h-7 w-7" />
                </div>
                <div>For You</div>
              </a>
              <a
                href="/library"
                className="flex items-center h-[56px] text-black mb-2 cursor-pointer hover:bg-[#f0efef]"
                // onClick={() => handleTagClick("library")}
              >
                <div
                  className={`w-[5px] h-full mr-4 ${
                    selectedTag === "/library" ? `bg-green-400` : ""
                  }`}
                ></div>
                <div className="flex items-center justify-center mr-2 ">
                  <BookmarkBorderOutlinedIcon className="h-7 w-7" />
                </div>
                <div>My Library</div>
              </a>
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
            <div className="h-[240px]">
              <a
                href="/settings"
                className="flex items-center h-[56px] text-black mb-2 cursor-pointer hover:bg-[#f0efef]"
              >
                <div
                  className={`w-[5px] h-full mr-4 ${
                    selectedTag === "/settings" ? `bg-green-400` : ""
                  }`}
                ></div>
                <div className="flex items-center justify-center mr-2">
                  <SettingsOutlinedIcon className="h-7 w-7" />
                </div>
                <div>Settings</div>
              </a>
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
                  <LoginOutlinedIcon className="h-7 w-7" />
                </div>
                <div>Logout</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#f7faf9] w-[200px] min-w-[200px] fixed top-0 left-0 h-screen z-[1000] transition-all">
          <div className="flex items-center justify-center h-[60px] max-w-[160px] m-auto ">
            <img
              className="w-full h-10"
              src="https://summarist.vercel.app/_next/image?url=%2F_n…%2Fstatic%2Fmedia%2Flogo.1b1c490b.png&w=1080&q=75"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-between pb-5 h-[calc(100vh-60px)] overflow-y-auto ">
            <div className="flex-1 mt-10 ">
              <a
                href="/foryoupage"
                className="flex items-center h-[56px] text-black mb-2 cursor-pointer hover:bg-[#f0efef]"
              >
                <div
                  className={`w-[5px] h-full mr-4 ${
                    selectedTag === "/foryoupage" ? `bg-green-400` : ""
                  }`}
                ></div>
                <div className="flex items-center justify-center mr-2 ">
                  <HomeOutlinedIcon className="h-7 w-7" />
                </div>
                <div>For You</div>
              </a>
              <a
                href="/library"
                className="flex items-center h-[56px] text-black mb-2 cursor-pointer hover:bg-[#f0efef]"
              >
                <div
                  className={`w-[5px] h-full mr-4 ${
                    selectedTag === "/library" ? `bg-green-400` : ""
                  }`}
                ></div>
                <div className="flex items-center justify-center mr-2 ">
                  <BookmarkBorderOutlinedIcon className="h-7 w-7" />
                </div>
                <div>My Library</div>
              </a>
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
            <div className="h-[240px]">
              <a
                href="/settings"
                className="flex items-center h-[56px] text-black mb-2 cursor-pointer hover:bg-[#f0efef]"
              >
                <div
                  className={`w-[5px] h-full mr-4 ${
                    selectedTag === "/settings" ? `bg-green-400` : ""
                  }`}
                ></div>
                <div className="flex items-center justify-center mr-2">
                  <SettingsOutlinedIcon className="h-7 w-7" />
                </div>
                <div>Settings</div>
              </a>
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
                  <LoginOutlinedIcon className="h-7 w-7" />
                </div>
                <div>Login</div>
              </div>
              {openModal && <SignIn handleCloseModal={handleCloseModal} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ForYouSideBar;
