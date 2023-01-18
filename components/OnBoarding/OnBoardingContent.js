import Image from "next/image";
import React from "react";
import HotOrNot from "../vote/svg/HotOrNot";
import { LensIconSvg } from "../vote/svg/LensIconSvg";
import FireSmallSvg from "../vote/svg/FirstTimeUser/FireSmallSvg";
import styles from "./OnBoarding.module.scss";

function OnboardingContent(props) {
  const onBoardingDetailsArray = props.onBoardingDetailsArray;
  const index = props.index;
  console.log("onBoardingDetailsArray", onBoardingDetailsArray);
  console.log("index", index);
  const [onboardingindex, setOnboardingindex] = React.useState(0);
  return (
    <>
      <div className={`${styles.card}`} {...props}>
        {/* {onBoardingDetailsArray && onBoardingDetailsArray.length > 0 && (
          <div className={`absolute pressable  ${styles.voteCard}`}> */}
        <div className={styles.onBoardingCard}>
          <div className={styles.headingContainer}>
            <LensIconSvg />
            <div className={styles.onBoardingHeading}>
              Built on Lens, For Lens Frens
            </div>
          </div>
          {index === 4 && (
            <>
              <div className={styles.welcomeText}>Welcome to</div>
              <div className="h-full">
                <HotOrNot />
              </div>
              <div className={styles.heading}>
                {onBoardingDetailsArray.title}
              </div>
              <div className={styles.subHeading}>
                Click <FireSmallSvg /> to move to the next card
              </div>
              <div className="absolute w-[104px] top-[420px]">
                <Image
                  src={onBoardingDetailsArray.gif}
                  width={103}
                  height={143}
                  alt="my gif"
                />
              </div>
            </>
          )}

          {index < 4 && (
            <>
              <div>
                <Image
                  src={onBoardingDetailsArray.gif}
                  width={onBoardingDetailsArray.width}
                  height={onBoardingDetailsArray.height}
                  alt="my gif"
                />
              </div>
              <div className={styles.heading}>
                {onBoardingDetailsArray.title}
              </div>
              <div className={styles.subHeading}>
                {onBoardingDetailsArray.subTitle}
              </div>
              <div className={styles.nextCardBtnText}>
                {index === 0
                  ? "Click to get started →"
                  : "Click to move to the next card →"}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default OnboardingContent;
