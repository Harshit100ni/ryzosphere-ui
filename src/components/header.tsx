import { useState, useEffect } from "react";
import Logo from "../ui-kit/icons/group.svg";
import SignIn from "./SignIn";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { isAuthenticated, updateAuthenticationStatus } = useLocalStorage();
  const [authState, setAuthState] = useState<string>(
    isAuthenticated || "false"
  );

  const handleSignInModal = () => {
    if (authState === "true") {
      setAuthState("false");
      updateAuthenticationStatus("false");
    } else {
      setIsOpenModal(true);
    }
  };

  useEffect(() => {
    setAuthState(isAuthenticated || "false");
  }, [isAuthenticated]);

  return (
    <>
      <SignIn {...{ isOpenModal, setIsOpenModal }} />
      <header className="bg-[#FFFFFF] border-b-2 border-[#eadfd3]">
        <div className="max-w-full h-[70px] mx-20 flex justify-between items-center">
          {/* <div className="w-[98.19px] h-[29.96px] relative"> */}
          <h1 className="text-3xl font-normal text-[#1D4A72]">
            The Ryzosphere
          </h1>
          {/* </div> */}

          <div className="flex items-center gap-4">
            {authState == "true" ? (
              <div className="w-10 h-10 overflow-hidden rounded-full bg-neutral-50">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : null}

            <div>
              <button
                onClick={() => handleSignInModal()}
                className="text-base border border-black text-white bg-[#1D4A72] rounded-full py-2 px-6 hover:cursor-pointer"
              >
                {authState === "true" ? "Sign Out" : "Sign In"}
              </button>
              <span className="ml-4">v0.1.0</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
