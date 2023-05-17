import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import SignUp from "./SignUp";
import { UserAuth } from "@/Components/context/AuthContext";
import Spinner from "@/Components/Spinner";
import Link from "next/link";

function SignIn({ handleCloseModal }) {
  const { logIn, guestLogin, signUpWithGoogle } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpModal, setSignUpModal] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [isGuestLoginLoading, setIsGuestLoginLoading] = useState(false);
  const [isGoogleLoginLoading, setIsGoogleLoginLoading] = useState(false);
  const [isMailLoginLoading, setMailLoginLoading] = useState(false);

  const closeModal = () => {
    handleCloseModal(false);
  };

  const openSignUpModal = () => {
    setSignUpModal(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setMailLoginLoading(true);
      await logIn(email, password);
      closeModal();
    } catch (error) {
      console.log(error);
      setMailLoginLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoginLoading(true);
      await signUpWithGoogle();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsGoogleLoginLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      setIsGuestLoginLoading(true);
      await guestLogin();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsGuestLoginLoading(false);
    }
  };

  return (
    <>
      {signUpModal ? (
        <SignUp handleCloseModal={handleCloseModal} />
      ) : (
        <div className="w-full z-[9999] fixed top-0 left-0 bg-[rgba(0,0,0,.75)] h-full flex justify-center items-center flex-col ">
          <div className="relative max-w-[400px] bg-[#fff] rounded-lg w-full z-[9999] shadow-[0,0,10px,rgba(0,0,0,.2)] ">
            <div className="pt-12 pr-8 pb-6 pl-8">
              <div className="text-center text-[20px] font-bold text-[#394547] mb-6">
                Log in to Summarist
              </div>
              <Link href="/foryoupage">
                <button
                  onClick={handleGuestLogin}
                  className="relative flex bg-[#3a579d] text-[#fff] justify-center w-full h-10 rounded text-lg items-center min-w-[180px]
                hover:bg-[#25397b] hover:ease-in transition active:transform active:translate-y-[1px]
                "
                >
                  <div className="bg-transparent flex items-center justify-center w-9  h-9 rounded absolute left-[2px]">
                    <PersonIcon className="w-9 h-9" />
                  </div>
                  {isGuestLoginLoading ? (
                    <Spinner />
                  ) : (
                    <div>Login as a Guest</div>
                  )}
                </button>
              </Link>

              <div
                className="flex items-center justify-center my-4 mx-0 
              before:content-[''] before:block before:flex-grow before:h-[1px] before:bg-[#bac8ce]
              after:content-[''] after:block after:flex-grow after:h-[1px] after:bg-[#bac8ce]
              
               "
              >
                <span className="mx-6 text-sm text-[#394547] font-medium">
                  or
                </span>
              </div>
              <Link href="/foryoupage">
                <button
                  onClick={handleGoogleSignIn}
                  className="relative flex bg-[#4285f4] text-[#fff] justify-center w-full h-10 rounded text-lg items-center min-w-[180px]
              hover:bg-[#3367d6] hover:ease-in transition active:transform active:translate-y-[1px]
              "
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded bg-[#fff] absolute left-[2px]">
                    <img
                      className="rounded"
                      src="https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip"
                      alt="googleLogo"
                    />
                  </div>
                  {isGoogleLoginLoading ? (
                    <Spinner />
                  ) : (
                    <div>Login with Google</div>
                  )}
                </button>
              </Link>

              <div
                className="flex items-center justify-center my-4 mx-0
              before:content-[''] before:block before:flex-grow before:h-[1px] before:bg-[#bac8ce]
              after:content-[''] after:block after:flex-grow after:h-[1px] after:bg-[#bac8ce]
              "
              >
                <span className="mx-6 text-sm text-[#394547] font-medium">
                  or
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <input
                  onClick={() => setEmailClicked(true)}
                  onBlur={() => setEmailClicked(false)}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-10  border-[2px] rounded text-[#394547] px-3 outline-none ${
                    emailClicked ? "border-[#2bd97c]" : "border-[#bac8ce] "
                  } `}
                  type="text"
                  placeholder="guest@gmail.com"
                ></input>
                <input
                  onClick={() => setPasswordClicked(true)}
                  onBlur={() => setPasswordClicked(false)}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`h-10  border-[2px] rounded text-[#394547] px-3 outline-none ${
                    passwordClicked ? "border-[#2bd97c]" : "border-[#bac8ce] "
                  } `}
                  type="password"
                  placeholder="guest123"
                ></input>
                <Link href="/foryoupage">
                  <button
                    onClick={handleLogin}
                    className="bg-[#2bd97c] text-[#394547] w-full h-10 rounded text-lg flex items-center justify-center
                     min-w-[180px] transition hover:bg-[#20ba68] hover:ease-in active:transform active:translate-y-[1px]"
                  >
                    {isMailLoginLoading ? <Spinner /> : <div>Login </div>}
                  </button>
                </Link>
              </div>
            </div>
            <div className="text-center text-[#116be9] font-light text-sm w-fit mx-auto mb-4 mt-0 cursor-pointer ">
              Forgot your password?
            </div>
            <div
              onClick={openSignUpModal}
              className="h-10 text-center bg-[#f1f6f4] text-[#116be9] w-full rounded-b pt-2 font-light text-base cursor-pointer
              transition hover:bg-gray-200"
            >
              Dont have an account?
            </div>
            <div className="absolute top-3 right-3 flex cursor-pointer transition hover:opacity-[.5] hover:ease-in ">
              <CloseIcon className="h-[30px] w-[30px]" onClick={closeModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
