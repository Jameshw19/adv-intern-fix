import firebase from "firebase/compat/app";
import "firebase/compat/auth";


export default async function isUserPremium(): Promise<boolean> {
  await firebase.auth().currentUser?.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser?.getIdTokenResult();

  return decodedToken?.claims?.stripeRole ? true : false;
}

// const auth: Auth = getAuth(app);

// export default async function isUserPremium(): Promise<boolean> {
//   await getIdToken(auth.currentUser);
//   const decodedToken = await getIdTokenResult(auth.currentUser);

//   return decodedToken?.claims?.stripRole ? true : false;
// }
