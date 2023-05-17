import { auth, db, googleAuthProvider } from "@/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const AuthContext = createContext();

// const auth = getAuth(app);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const router = useRouter();

  // console.log(user);

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (password.length < 6) {
        throw new Error("Password should be at least 6 characters");
      }
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { email: user.email });
      // Redirect to "/foryoupage" if the user is on the home page
      // if (router.pathname === "/") {
      //   router.push("/foryoupage");
      // }
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email";
          break;
        case "auth/user-not-found":
          errorMessage = "User not found";
          break;
        default:
          errorMessage = "Something went wrong";
      }
      alert(errorMessage);
      throw error;
    }
  };

  const signUpWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // User does not exist, create a new account
        await setDoc(userRef, {
          email: user.email,
        });
      }

      // Redirect to the /foryoupage if on the home page
      // if (router.pathname === "/") {
      //   router.push("/foryoupage");
      // }
    } catch (error) {
      let errorMessage = "Something went wrong";
      alert(errorMessage);
      throw error;
    }
  };

  const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential;
      //   console.log(user);
      // if (router.pathname === "/") {
      //   router.push("/foryoupage");
      // }
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email";
          break;
        case "auth/wrong-password":
          errorMessage =
            "Incorrect password. Please enter the correct password";
          break;
        case "auth/user-not-found":
          errorMessage = "User not found";
          break;
        default:
          errorMessage = "Something went wrong";
      }
      alert(errorMessage);
    }
  };

  const guestLogin = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential;
      // console.log(user);
      // const router = useRouter();
      // if (router.pathname === "/") {
      //   router.push("/foryoupage");
      // }
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
      }
      alert(errorMessage);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     console.log("User", currentUser);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);

      if (currentUser && router.pathname === "/") {
        router.push("/foryoupage");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authContextValue = {
    signUp,
    logIn,
    guestLogin,
    logOut,
    user,
    signUpWithGoogle,
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        logIn,
        guestLogin,
        logOut,
        signUpWithGoogle,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
