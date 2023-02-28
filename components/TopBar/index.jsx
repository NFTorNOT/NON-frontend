import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { useUserContext } from "../../context/UserContext";
import { NONLogoSvgBig } from "../Layout/NONLogoSvgBig";
import NONLogo from "../NONLogo";
import SignInButton from "./SignInButton";
import ToastIcon from "./ToastIcon";
import styles from "./TopBar.module.scss";

export const notify = ({ text,duration }) =>
  toast.custom((t) => (
    <div
      className={`${t.visible ? "animate-enter" : "animate-leave"} ${
        styles.toastContainer
      } bg-white shadow-lg rounded-[16px] pointer-events-auto flex justify-center items-center ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 p-4 ">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0 pt-0.5">
            <ToastIcon />
          </div>
          <p className={styles.toastText}>{text}</p>
        </div>
      </div>
    </div>
  ),{
    duration: duration
  });

export default function TopBar() {
  const { isUserLoggedIn } = useAuthContext();
  const { userProfile } = useUserContext();

  useEffect(() => {
    if (isUserLoggedIn && Object.values(userProfile).length > 0) {
      notify({ text: "You’re on the Lens Testnet" ,duration:10000});
    }

    return () => {};
  }, [isUserLoggedIn]);

  return (
    <>
    <div className={styles.newImage}>
        <div className={`${styles.bigNonlogo} flex items-center justify-center h-[100px]`}> <NONLogoSvgBig /> </div>
      </div>
      <div className={styles.container}>
          <NONLogo />
        <div>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{ duration: 4000 }}
          />
        </div>
        <SignInButton notify={notify}/>
      </div>
      </>
  );
}
