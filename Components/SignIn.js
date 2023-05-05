import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import SignUp from "./SignUp";
import { useRouter } from "next/router";
import { UserAuth } from "@/Components/context/AuthContext";

function SignIn({ handleCloseModal }) {
  const { logIn, guestLogin } = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpModal, setSignUpModal] = useState(false);
  const { push } = useRouter();

  const closeModal = () => {
    handleCloseModal(false);
  };

  const openSignUpModal = () => {
    setSignUpModal(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await guestLogin();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {signUpModal ? (
        <SignUp handleCloseModal={handleCloseModal} />
      ) : (
        <div className="w-full z-[9999] fixed top-0 left-0 bg-slate-900 bg-opacity-50 h-full flex justify-center items-center flex-col ">
          <div className="relative max-w-[400px] bg-white rounded-lg w-full z-[9999] ">
            <div className="pt-12 pr-8 pb-5 pl-8">
              <div className="text-center text-lg font-bold text-black mb-5">
                Log in to Summarist
              </div>
              <button
                onClick={handleGuestLogin}
                className="relative flex bg-blue-800 text-white justify-center w-full h-10 rounded text-lg items-center min-w-[180px]"
              >
                <div className="bg-transparent flex items-center justify-center w-9  h-9 rounded absolute left-[2px]">
                  <PersonIcon className="w-8 h-8" />
                </div>
                <div>Login as a guest</div>
              </button>
              <div className="flex items-center justify-center my-4 mx-0 ">
                <span className="mx-5 text-sm text-black font-medium">or</span>
              </div>
              <button className="relative flex bg-blue-600 text-white justify-center w-full h-10 rounded text-lg items-center min-w-[180px]">
                <div className="flex items-center justify-center w-9 h-9 rounded bg-white absolute left-[2px]">
                  <img
                    className="rounded"
                    src="http://expresswriters.com/wp-content/uploads/2015/09/google-new-logo-450x450.jpg"
                    alt="googleLogo"
                  />
                </div>
                <div>Login with google</div>
              </button>
              <div className="flex items-center justify-center my-4 mx-0 ">
                <span className="mx-5 text-sm text-black font-medium">or</span>
              </div>
              <div className="flex flex-col gap-4">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 border-gray-300 border-[2px] rounded text-black px-3 outline-none"
                  type="text"
                  placeholder="Email Address"
                ></input>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 border-gray-300 border-[2px] rounded text-black px-3 outline-none"
                  type="text"
                  placeholder="Password"
                ></input>

                <button
                  onClick={handleLogin}
                  className="bg-green-500 text-black w-full h-10 rounded text-lg flex items-center justify-center
                     min-w-[180px] transition hover:bg-green-400"
                >
                  <span>Login</span>
                </button>
              </div>
            </div>
            <div className="text-center text-blue-600 font-light text-sm w-fit mx-auto mb-4 mt-0 cursor-pointer">
              Forgot your password?
            </div>
            <div
              onClick={openSignUpModal}
              className="h-10 text-center bg-gray-100 text-blue-600 w-full rounded-b pt-1 font-light text-base cursor-pointer
              transition hover:bg-gray-200"
            >
              Dont have an account?
            </div>
            <div className="absolute top-3 right-3 flex cursor-pointer transition hover:text-gray-500 ">
              <CloseIcon onClick={closeModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
