import CloseIcon from "@mui/icons-material/Close";
import SignIn from "./SignIn";
import { useState } from "react";
import { UserAuth } from "@/Components/context/AuthContext";

function SignUp({ handleCloseModal }) {
  const { signUp } = UserAuth();

  const [signInModal, setSignInModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const auth = getAuth(app);

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
    } catch (error) {
      console.log(error);
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
        <div className="w-full z-[9999] fixed top-0 left-0 bg-slate-900 bg-opacity-50 h-full flex justify-center items-center flex-col ">
          <div className="relative max-w-[400px] bg-white rounded-lg w-full z-[9999] ">
            <div className="pt-12 pr-8 pb-5 pl-8">
              <div className="text-center text-lg font-bold text-black mb-5">
                Sign Up to Summarist
              </div>

              <button className="relative flex bg-blue-600 text-white justify-center w-full h-10 rounded text-lg items-center min-w-[180px]">
                <div className="flex items-center justify-center w-9 h-9 rounded bg-white absolute left-[2px]">
                  <img
                    className="rounded"
                    src="http://expresswriters.com/wp-content/uploads/2015/09/google-new-logo-450x450.jpg"
                    alt="googleLogo"
                  />
                </div>
                <div>SignUp with google</div>
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
                  type="password"
                  placeholder="Password"
                ></input>
                <button
                  onClick={handleSignUp}
                  className="bg-green-500 text-black w-full h-10 rounded text-lg flex items-center justify-center
                min-w-[180px] transition hover:bg-green-400"
                >
                  <span>SignUp</span>
                </button>
              </div>
            </div>

            <div
              onClick={previousModal}
              className="h-10 text-center bg-gray-100 text-blue-600 w-full rounded-b pt-1 font-light text-base cursor-pointer
             transition hover:bg-gray-200"
            >
              Already have an account?
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

export default SignUp;
