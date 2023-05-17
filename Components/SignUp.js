import CloseIcon from "@mui/icons-material/Close";
import SignIn from "./SignIn";
import { useState } from "react";
import { UserAuth } from "@/Components/context/AuthContext";
import Spinner from "@/Components/Spinner";
import Link from "next/link";

function SignUp({ handleCloseModal }) {
  const { signUp, signUpWithGoogle } = UserAuth();
  const [emailClicked, setEmailClicked] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [signInModal, setSignInModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleSignUpLoading, setIsGoogleSignUpLoading] = useState(false);
  const [isEmailSignUpLoading, setIsEmailSignUpLoading] = useState(false);

  // const auth = getAuth(app);

  const handleSignUpGoogle = async () => {
    try {
      setIsGoogleSignUpLoading(true);
      await signUpWithGoogle();
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setIsGoogleSignUpLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setIsEmailSignUpLoading(true);
      await signUp(email, password);
      closeModal();
    } catch (error) {
      console.log(error);
      setIsEmailSignUpLoading(false);
    }
  };

  const closeModal = () => {
    handleCloseModal(false);
  };

  const previousModal = () => {
    setSignInModal(true);
  };

  return (
    <>
      {signInModal ? (
        <SignIn handleCloseModal={handleCloseModal} />
      ) : (
        <div className="w-full z-[9999] fixed top-0 left-0 bg-[rgba(0,0,0,.75)] h-full flex justify-center items-center flex-col ">
          <div className="relative max-w-[400px] bg-[#fff] rounded-lg w-full z-[9999] shadow-[0,0,10px,rgba(0,0,0,.2)] ">
            <div className="pt-12 pr-8 pb-6 pl-8">
              <div className="text-center text-lg font-bold text-[#032b41] mb-5">
                Sign up to Summarist
              </div>
              {/* <Link href="/foryoupage"> */}
              <button
                onClick={handleSignUpGoogle}
                className="relative flex bg-[#4285f4] text-[#fff] justify-center w-full h-10 rounded text-lg items-center min-w-[180px]
              transition hover:ease-in hover:bg-[#3367d6] active:transform active:translate-y-[1px]
              "
              >
                <div className="flex items-center justify-center w-9 h-9 rounded bg-[#fff] absolute left-[2px]">
                  <img
                    className="rounded"
                    src="http://expresswriters.com/wp-content/uploads/2015/09/google-new-logo-450x450.jpg"
                    alt="googleLogo"
                  />
                </div>
                {isGoogleSignUpLoading ? (
                  <Spinner />
                ) : (
                  <div>Sign up with Google</div>
                )}
              </button>
              {/* </Link> */}

              <div
                className="flex items-center justify-center my-4 mx-0 
               before:content-[''] before:block before:flex-grow before:h-[1px] before:bg-[#bac8ce]
               after:content-[''] after:block after:flex-grow after:h-[1px] after:bg-[#bac8ce]
               
              "
              >
                <span className="mx-5 text-sm text-[#032b41] font-medium">
                  or
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <input
                  onClick={() => setEmailClicked(true)}
                  onBlur={() => setEmailClicked(false)}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-10  border-[2px] rounded text-[#032b41] px-3 outline-none ${
                    emailClicked ? "border-[#2bd97c]" : "border-[#bac8ce] "
                  } `}
                  type="text"
                  placeholder="Email Address"
                ></input>
                <input
                  onClick={() => setPasswordClicked(true)}
                  onBlur={() => setPasswordClicked(false)}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`h-10  border-[2px] rounded text-[#032b41] px-3 outline-none ${
                    passwordClicked ? "border-[#2bd97c]" : "border-[#bac8ce] "
                  } `}
                  type="password"
                  placeholder="Password"
                ></input>

                {/* <Link href="/foryoupage"> */}
                <button
                  onClick={handleSignUp}
                  className="bg-[#2bd97c] text-[#032b41] w-full h-10 rounded text-lg flex items-center justify-center
                min-w-[180px] transition hover:bg-[#20ba68] hover:ease-in active:transform active:translate-y-[1px]"
                >
                  {isEmailSignUpLoading ? <Spinner /> : <div>Sign up</div>}
                </button>
                {/* </Link> */}
              </div>
            </div>

            <div
              onClick={previousModal}
              className="h-10 text-center bg-[#f1f6f4] text-[#116be9] w-full rounded-b pt-1 font-light text-base cursor-pointer
             transition hover:bg-[#e1e9e8] hover:ease-in"
            >
              Already have an account?
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

export default SignUp;
