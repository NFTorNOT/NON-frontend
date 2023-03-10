import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./WalletConnect.module.scss";
import Image from "next/image";
import { SignIn } from "..";

export default function WalletConnect({
  openSignInModal,
  onSignIn,
  isLoading,
  showSquareLoginButton,
}) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              className: styles.container,
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className={`${styles.connectButton} btn btn-green px-[10px] md:px-[20px] transition`}
                    onClick={openSignInModal}
                    type="button"
                    title="Sign in with lens"
                  >
                    <Image
                      src="https://static.plgworks.com/assets/images/non/lens-icon.png"
                      alt="Lens Icon"
                      width="20"
                      height="20"
                    />
                    <span className="ml-2 hidden text-skin-green md:block">
                      Sign in with Lens
                    </span>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <SignIn
                  onSignIn={onSignIn}
                  isLoading={isLoading}
                  showSquareLoginButton={showSquareLoginButton}
                />
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
