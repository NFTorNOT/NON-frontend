import React from "react";
import TopBar from "../TopBar";
import BottomTabSelector from "../BottomTabSelector";
import { useRouter } from "next/router";
import styles from "../Main/Main.module.scss";
import JoinedFromTablet from "./JoinedFromTablet";
import SmallScreenData from "./SmallScreenData";

export default function Layout({ children, ...props }) {
  const router = useRouter();
  const showNavBar =
    router.pathname !== "/404" &&
    router.pathname !== "/50x" &&
    router.pathname !== "/429";
  const showFooter =
    router.pathname !== "/404" &&
    router.pathname !== "/50x" &&
    router.pathname !== "/429";
  const getErrorUI = () => {
    return <div>{children}</div>;
  };

  const getLayoutUI = () => {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <TopBar />
          <div className={styles.pageWrap}>{children}</div>
          <div className={styles.tabletView}>
            <JoinedFromTablet />
          </div>

          <div className={styles.mobileview}>
            <div className="flex flex-col justify-center items-center px-[52px] pb-[52px] gap-[20px]">
              <SmallScreenData />
            </div>
          </div>
          <BottomTabSelector />
        </div>
      </div>
    );
  };
  return <>{showNavBar && showFooter ? getLayoutUI() : getErrorUI()}</>;
}
