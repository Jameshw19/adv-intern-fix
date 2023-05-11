import ForYouHeader from "@/Components/ForYouHeader";
import ForYouSideBar from "@/Components/ForYouSideBar";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../Components/context/AuthContext";
import { useRouter } from "next/router";
import SignIn from "@/Components/SignIn";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";

function settings() {
  const { user } = UserAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { push } = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isUser, isUserLoading] = useAuthState(firebase.auth());
  const userIsPremium = usePremiumStatus(user);
  const userIsPremiumPlus = usePremiumStatus(user);

  const [showSidebar, setShowSidebar] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => {
      setIsLoading(false);
      // setIsSubscribed(true);
    }, 2000);
  }, []);

  const handleUpgradePlan = () => {
    // setIsSubscribed(true);
    push("/choose-plan");
    return setIsSubscribed;
  };

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <ForYouHeader />
      {showSidebar && <ForYouSideBar />}
      {user ? (
        <div
          className="relative flex flex-col ml-[200px] w-[calc(100%-200px)]
       transition
       max-md:ml-0 max-md:w-full
       "
        >
          <div className="py-10 w-full">
            <div className="max-w-[1070px] w-full my-0 mx-auto px-6">
              <div className="text-left border-b-[1px] pb-4 text-3xl text-[#032b41] mb-8 font-bold ">
                Settings
              </div>
              {isLoading ? (
                <>
                  <div className="flex flex-col items-start gap-2 mb-8 border-b-[1px] border-b-[#e1e7ea] pb-6">
                    <div className="flex flex-col items-start gap-2 mb-8 pb-6">
                      <div className="w-[160px] h-6 bg-gray-200 animate-pulse rounded"></div>
                      <div className="w-[130px] h-6 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 pb-6  ">
                    <div className=" w-[160px] h-6 text-lg bg-gray-200 animate-pulse rounded "></div>
                    <div className=" w-[130px] h-6 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-start gap-2 mb-8 border-b-[1px] border-b-[#e1e7ea] pb-6">
                    <div className="text-lg font-bold text-[#032b41] ">
                      Your Subscription plan
                    </div>

                    {!userIsPremium ? (
                      <>
                        <div className="text-[#032b41]">Basic</div>
                        <button
                          onClick={handleUpgradePlan}
                          className="bg-[#2bd97c] text-black w-[200px] h-10 rounded text-base flex items-center justify-center min-w-[180px] cursor-pointer outline-none border-none"
                        >
                          <span className="text-base text-black">
                            Upgrade to Premium
                          </span>
                        </button>
                      </>
                    ) : userIsPremiumPlus && !userIsPremium ? (
                      <div className="text-[#032b41]">Premium Plus</div>
                    ) : (
                      <div className="text-[#032b41]">Premium</div>
                    )}
                  </div>
                  <div className="flex flex-col items-start gap-2 pb-6">
                    <div className="text-lg font-bold text-[#032b41] ">
                      Email
                    </div>
                    <div className="text-[#032b41]">{user.email}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="relative flex flex-col ml-[200px] w-[calc(100%-200px)] transition max-md:ml-0 max-md:w-full">
            <div className="py-10 w-full">
              <div className="max-w-[1070px] w-full my-0 mx-auto px-6">
                <div className="text-left border-b-[1px] pb-4 text-3xl text-[#032b41] mb-8 font-bold max-md:text-2xl ">
                  Settings
                </div>
                <div className="max-w-[460px] flex flex-col items-center m-auto">
                  <img
                    className="w-full h-full"
                    src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogin.e313e580.png&w=3840&q=75"
                    alt=""
                  />
                  <div className="text-2xl font-bold text-[#032b41] text-center mb-4">
                    Log in to your account to see your details.
                  </div>
                  <button
                    onClick={handleOpenModal}
                    className="w-[100px] bg-[#2bd97c] text-[#032b41] h-10 rounded text-base flex items-center justify-center min-w-[180px]
                  transition hover:bg-[#20ba68] hover:ease-in
                  "
                  >
                    Login
                  </button>
                  {openModal && <SignIn handleCloseModal={handleCloseModal} />}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default settings;
