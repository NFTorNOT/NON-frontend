import React from "react";
import TopBar from "../TopBar";
import BottomTabSelector from "../BottomTabSelector";
import { useRouter } from "next/router";
import styles from "../Main/Main.module.scss";
import JoinedFromSmallScreen from "./JoinedFromSmallScreen";

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
          <div className={styles.mobileView}>
            <JoinedFromSmallScreen />
          </div>
          <BottomTabSelector />

          {/* <TopBar smallScreen={width > 1024 ? false : true} />
          {width > 1024 ? <>{children}</> : <JoinedFromSmallScreen />}
          <BottomTabSelector smallScreen={width > 1024 ? false : true} />{" "} */}
        </div>
      </div>
    );
  };
  return <>{showNavBar && showFooter ? getLayoutUI() : getErrorUI()}</>;
}
