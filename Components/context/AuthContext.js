import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const AuthContext = createContext();

// const auth = getAuth(app);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

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
      //   console.log(user);
      alert("Successfully created an Account!");
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        email: user.email,
      });
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

  const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential;
      //   console.log(user);
      alert("Successfully Logged Into Your Account");
      if (location.pathname === "/") {
        push("/foryoupage");
      }
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
      if (location.pathname === "/") {
        push("/foryoupage");
      }
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const { push } = useRouter();

  const authContextValue = {
    signUp,
    logIn,
    guestLogin,
    logOut,
    user,
  };

  return (
    <AuthContext.Provider value={{ signUp, logIn, guestLogin, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
