import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import isUserPremium from "./isUserPremium";
import isUserPremiumPlus from "./isUserPremiumPlus";

export default function usePremiumStatus(user: User) {
  const [premiumStatus, setPremiumStatus] = useState<boolean>(false);
  const [userIsPremiumPlus, setUserIsPremiumPlus] = useState<boolean>(false);

  useEffect(() => {
    const checkPremiumStatus = async function () {
      if (user) {
        setPremiumStatus(await isUserPremium());
        setUserIsPremiumPlus(await isUserPremiumPlus());
      }
    };
    checkPremiumStatus();
  }, [user]);

  return { premiumStatus, userIsPremiumPlus };
}

// export default function usePremiumStatus(user: User) {
//   const [premiumStatus, setPremiumStatus] = useState<boolean>(false);

//   useEffect(() => {
//     if (user) {
//       const checkPremiumStatus = async function () {
//         setPremiumStatus(await isUserPremium());
//       };
//       checkPremiumStatus();
//     }
//   }, [user]);

//   return premiumStatus;
// }
