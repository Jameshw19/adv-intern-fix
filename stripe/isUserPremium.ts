import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default async function isUserPremium(): Promise<boolean> {
  const user = firebase.auth().currentUser;
  if (!user) {
    return false;
  }

  await user.getIdToken(true);
  const decodedToken = await user.getIdTokenResult();

  return decodedToken?.claims?.stripeRole ? true : false;
}

// export default async function isUserPremium(): Promise<boolean> {
//   await firebase.auth().currentUser?.getIdToken(true);
//   const decodedToken = await firebase.auth().currentUser?.getIdTokenResult();

//   return decodedToken?.claims?.stripeRole ? true : false;
// }
