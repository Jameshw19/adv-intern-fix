import DescriptionIcon from "@mui/icons-material/Description";
import SpaIcon from "@mui/icons-material/Spa";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import Footer from "@/Components/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession } from "@/stripe/createCheckoutSession";
import { UserAuth } from "@/Components/context/AuthContext";
import usePremiumStatus from "@/stripe/usePremiumStatus";
import { getAuth } from "firebase/auth";
import SignIn from "@/Components/SignIn";

function ChoosePlan() {
  const { user } = UserAuth();
  const auth = getAuth();

  const [isDivShown0, setIsDivShown0] = useState(false);
  const [isDivShown1, setIsDivShown1] = useState(false);
  const [isDivShown2, setIsDivShown2] = useState(false);
  const [isDivShown3, setIsDivShown3] = useState(false);
  const [expandIcon, setExpandIcon] = useState(<ExpandMoreIcon />);

  const [selectedPlan, setSelectedPlan] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const [isUser, userLoading] = useAuthState(auth);
  const userIsPremium = usePremiumStatus(isUser);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubscriptionClick = () => {
    if (selectedPlan === "premiumYearly") {
      createCheckoutSession(user.uid, "price_1N0QPuLXOr0D0CNbFAYklmsF");
    } else {
      createCheckoutSession(user.uid, "price_1N1VuqLXOr0D0CNbCMpNCdGv");
    }
  };

  const toggleDiv0 = () => {
    setIsDivShown0(!isDivShown0);
    setExpandIcon(isDivShown0 ? <ExpandMoreIcon /> : <ExpandLessIcon />);
  };
  const toggleDiv1 = () => {
    setIsDivShown1(!isDivShown1);
  };
  const toggleDiv2 = () => {
    setIsDivShown2(!isDivShown2);
  };
  const toggleDiv3 = () => {
    setIsDivShown3(!isDivShown3);
  };

  return (
    <>
      <div className="ml-0 w-full relative flex max-md:ml-0 max-md:w-full ">
        <div className="opacity-0 pointer-events-none fixed top-0 left-0 w-full h-full bg-[#3a4649] z-10"></div>
        <div className="w-full">
          <div
            className="relative text-center w-full pt-12 mb-6 
          before:content-none before:absolute before:top-0 before:left-0 before:z-[-1] before:w-full before:h-full before:bg-[#032b41]
          before:max-md:rounded-b-none
          "
          >
            <div className="absolute top-0 left-0 z-[-1] w-full h-full bg-[#032b41] rounded-b-[16rem]"></div>
            <div className="max-w-[1000px] m-auto text-white px-5">
              <div className="text-5xl font-bold mb-10 max-md:text-[26px] max-md:mb-8">
                Unlimited access to many amazing books to read
              </div>
              <div className="text-xl mb-8 max-md:text-base">
                Turn ordinary moments into amazing learning opportunities
              </div>
              <div className="flex justify-center max-w-[340px] m-auto  overflow-hidden">
                <img
                  className="w-full h-full"
                  src="https://summarist.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpricing-top.4d86e93a.png&w=1920&q=75"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="max-w-[1070px] w-full m-auto px-5">
            <div className="py-10 w-full">
              <div
                className="grid grid-cols-[repeat(3,1fr)] justify-items-center text-center gap-5 max-w-[800px] m-auto mb-[50px]
              max-md:grid-cols-[1fr]
              "
              >
                <div>
                  <div className="flex justify-center text-black mb-3  ">
                    <DescriptionIcon className="h-[60px] w-[60px]" />
                  </div>
                  <div className="text-[#394547] leading-normal">
                    <b>Key ideas in few min</b> with many books to read
                  </div>
                </div>
                <div>
                  <div className="flex justify-center text-[#032b41] mb-3">
                    <SpaIcon className="h-[60px] w-[60px]" />
                  </div>
                  <div className="text-[#394547] leading-normal ">
                    <b>3 million</b> people growing with Summarist everyday
                  </div>
                </div>
                <div>
                  <div className="flex justify-center text-[#032b41] mb-3">
                    <HandshakeIcon className="h-[60px] w-[60px]" />
                  </div>
                  <div className="text-[#394547] leading-normal ">
                    <b>Precise recommendations</b> collections curated by
                    experts
                  </div>
                </div>
              </div>
              <div className="text-3xl text-[#032b41] text-center mb-8 font-bold max-md:text-[24px]">
                Choose the plan that fits you
              </div>
              <div
                className={`flex gap-5 p-5 bg-[#f1f6f4] border-4 rounded cursor-pointer max-w-[680px] m-auto ${
                  selectedPlan === "premiumYearly"
                    ? "border-[#2be080]"
                    : "border-[#bac8ce]"
                }`}
                onClick={() => setSelectedPlan("premiumYearly")}
              >
                <div
                  className={`relative w-5 h-5 rounded-[50%] border-2 border-black flex items-center justify-center ${
                    selectedPlan === "premiumYearly"
                  }`}
                >
                  {selectedPlan === "premiumYearly" && (
                    <div className="absolute w-[6px] h-[6px] bg-black rounded-[50%]"></div>
                  )}
                </div>
                <div>
                  <div className="text-lg font-semibold text-[#032b41] mb-2 max-md:text-base">
                    Premium Plus Yearly
                  </div>

                  <div className="text-2xl font-bold text-[#032b41] mb-2 max-md:text-xl ">
                    $99.99/year
                  </div>

                  <div className="text-sm text-[#6b757b] max-md:text-xs  ">
                    7-day free trial included
                  </div>
                </div>
              </div>
              <div className="text-sm text-[#6b757b] flex items-center gap-2 max-w-[240px] m-auto my-[6px]">
                <div className="flex-grow h-[1px] bg-[#bac8ce]"></div>
                <div>or</div>
                <div className="flex-grow h-[1px] bg-[#bac8ce]"></div>
              </div>
              <div>
                <div
                  className={`flex gap-5 p-5 bg-[#f1f6f4] border-4 rounded cursor-pointer max-w-[680px] m-auto ${
                    selectedPlan === "premiumMonthly"
                      ? "border-[#2be080]"
                      : "border-[#bac8ce]"
                  }`}
                  onClick={() => setSelectedPlan("premiumMonthly")}
                >
                  <div
                    className={`relative w-5 h-5 rounded-[50%] border-2 border-black flex items-center justify-center ${
                      selectedPlan === "premiumMonthly"
                    }`}
                  >
                    {selectedPlan === "premiumMonthly" && (
                      <div className="absolute w-[6px] h-[6px] bg-black rounded-[50%]"></div>
                    )}
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[#032b41] mb-2 max-md:text-base ">
                      Premium Monthly
                    </div>
                    <div className="text-2xl font-bold text-[#032b41] mb-2  max-md:text-xl ">
                      $9.99/month
                    </div>
                    <div className="text-sm text-[#6b757b] max-md:text-xs">
                      No trial included
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white sticky bottom-0 z-1 py-8 flex flex-col items-center gap-4">
                {selectedPlan ? (
                  <span>
                    {user ? (
                      <>
                        {!userIsPremium ? (
                          <button
                            onClick={handleSubscriptionClick}
                            className="bg-[#2bd97c] text-black w-[300px] h-10 rounded text-base flex items-center justify-center min-w-[180px]
                        cursor-pointer outline-none border-none"
                          >
                            <span className="text-base text-black">
                              {selectedPlan === "premiumYearly"
                                ? "Start your free 7-day trial"
                                : "Start your first month"}
                            </span>
                          </button>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <>
                        <>
                          <button
                            onClick={handleOpenModal}
                            className="bg-[#2bd97c] text-black w-[300px] h-10 rounded text-base flex items-center justify-center min-w-[180px]
                        cursor-pointer outline-none border-none"
                          >
                            <span className="text-base text-black">
                              {selectedPlan === "premiumYearly"
                                ? "Start your free 7-day trial"
                                : "Start your first month"}
                            </span>
                          </button>
                          {openModal && (
                            <SignIn handleCloseModal={handleCloseModal} />
                          )}
                        </>
                      </>
                    )}
                  </span>
                ) : null}
                {selectedPlan ? (
                  <div className="text-xs text-[#6b757b] text-center">
                    {selectedPlan === "premiumYearly"
                      ? "Cancel your trial at any time before it ends, and you won’t be charged"
                      : "30-day money back guarantee, no questions asked."}
                  </div>
                ) : null}
              </div>

              <div>
                <div className="border-b-[1px] border-b-[#ddd] mb-2 overflow-hidden">
                  <div
                    onClick={toggleDiv0}
                    className="flex justify-between items-center cursor-pointer py-5 gap-2 "
                  >
                    <div className="font-medium text-2xl relative mb-0 text-[#032b41] max-md:text-xl ">
                      How does the free 7-day trial work?
                    </div>
                    {isDivShown0 ? (
                      <ExpandLessIcon className="w-10 h-10 min-w-[24px] transition duration-[.35] ease-in" />
                    ) : (
                      <ExpandMoreIcon className="w-10 h-10 min-w-[24px] transition duration-[.35] ease-in" />
                    )}
                  </div>
                  <div
                    className={`h-0 relative overflow-hidden transition duration-[.35] ease-in  ${
                      isDivShown0 ? "pb-6 h-[171px]" : ""
                    }`}
                  >
                    <div className="min-h-[1px] pb-6 text-[#394547] leading-normal max-md:text-sm ">
                      Begin your complimentary 7-day trial with a Summarist
                      annual membership. You are under no obligation to continue
                      your subscription, and you will only be billed when the
                      trial period expires. With Premium access, you can learn
                      at your own pace and as frequently as you desire, and you
                      may terminate your subscription prior to the conclusion of
                      the 7-day free trial.
                    </div>
                  </div>
                </div>
                <div className="border-b-[1px] border-b-[#ddd] mb-2 overflow-hidden">
                  <div
                    onClick={toggleDiv1}
                    className="flex justify-between items-center cursor-pointer py-5 gap-2 "
                  >
                    <div className="font-medium text-2xl relative mb-0 text-[#032b41] max-md:text-xl ">
                      Can I switch subscriptions from monthly to yearly, or
                      yearly to monthly?
                    </div>
                    {isDivShown1 ? (
                      <ExpandLessIcon className="w-10 h-10 min-w-[24px] transition duration-[.35]" />
                    ) : (
                      <ExpandMoreIcon className="w-10 h-10 min-w-[24px] transition duration-[.35]" />
                    )}
                  </div>
                  <div
                    className={`h-0 relative overflow-hidden transition duration-[.35] ${
                      isDivShown1 ? "pb-6 h-[108px]" : ""
                    }`}
                  >
                    <div className="min-h-[1px] pb-6 text-[#394547] leading-normal max-md:text-sm">
                      While an annual plan is active, it is not feasible to
                      switch to a monthly plan. However, once the current month
                      ends, transitioning from a monthly plan to an annual plan
                      is an option.
                    </div>
                  </div>
                </div>
                <div className="border-b-[1px] border-b-[#ddd] mb-2 overflow-hidden">
                  <div
                    onClick={toggleDiv2}
                    className="flex justify-between items-center cursor-pointer py-5 gap-2 "
                  >
                    <div className="font-medium text-2xl relative mb-0 text-[#032b41] max-md:text-xl ">
                      What's included in the Premium plan?
                    </div>
                    {isDivShown2 ? (
                      <ExpandLessIcon className="w-10 h-10 min-w-[24px] transition duration-[.35]" />
                    ) : (
                      <ExpandMoreIcon className="w-10 h-10 min-w-[24px] transition duration-[.35]" />
                    )}
                  </div>
                  <div
                    className={`h-0 relative overflow-hidden transition duration-[.35] ${
                      isDivShown2 ? "pb-6 h-[129px]" : ""
                    }`}
                  >
                    <div className="min-h-[1px] pb-6 text-[#394547] leading-normal max-md:text-sm">
                      Premium membership provides you with the ultimate
                      Summarist experience, including unrestricted entry to many
                      best-selling books high-quality audio, the ability to
                      download titles for offline reading, and the option to
                      send your reads to your Kindle.
                    </div>
                  </div>
                </div>
                <div className="border-b-[1px] border-b-[#ddd] mb-2 overflow-hidden">
                  <div
                    onClick={toggleDiv3}
                    className="flex justify-between items-center cursor-pointer py-5 gap-2 "
                  >
                    <div className="font-medium text-2xl relative mb-0 text-[#032b41] max-md:text-xl ">
                      Can I cancel during my trial or subscription?
                    </div>
                    {isDivShown3 ? (
                      <ExpandLessIcon className="w-10 h-10 min-w-[24px] transition duration-[.35]" />
                    ) : (
                      <ExpandMoreIcon className="w-10 h-10 min-w-[24px] transition duration-[.35]" />
                    )}
                  </div>
                  <div
                    className={`h-0 relative overflow-hidden transition duration-[.35]  ${
                      isDivShown3 ? "pb-6 h-[108px] " : ""
                    }`}
                  >
                    <div className="min-h-[1px] pb-6 text-[#394547] leading-normal max-md:text-sm ">
                      You will not be charged if you cancel your trial before
                      its conclusion. While you will not have complete access to
                      the entire Summarist library, you can still expand your
                      knowledge with one curated book per day.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default ChoosePlan;
