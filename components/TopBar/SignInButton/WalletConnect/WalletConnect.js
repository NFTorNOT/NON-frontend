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
                  <div className="flex flex-col justify-center items-center gap-[4px]">
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
                    <div className="flex gap-[4px] self-center">
                      <span className="text-white opacity-60 not-italic text-[12px] font-medium">
                        on
                      </span>
                      <span className="text-white opacity-80 not-italic text-[12px] font-medium">
                        testnet
                      </span>
                    </div>
                  </div>
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
