import Image from "next/image";
import React from "react";
import HotOrNot from "../vote/svg/HotOrNot";
import { LensIconSvg } from "../vote/svg/LensIconSvg";
import FireSmallSvg from "../vote/svg/FirstTimeUser/FireSmallSvg";
import styles from "./OnBoarding.module.scss";
import FireSmallGreySvy from "../vote/svg/FirstTimeUser/FireSmallGreySvg";

function OnboardingContent(props) {
  const onBoardingDetailsArray = props.onBoardingDetailsArray;
  const index = props.index;

  return (
    <>
      <div className={`${styles.card}`} {...props}>
        {/* {onBoardingDetailsArray && onBoardingDetailsArray.length > 0 && (
          <div className={`absolute pressable  ${styles.voteCard}`}> */}
        <div className={styles.onBoardingCard}>
          <div className={styles.headingContainer}>
            <LensIconSvg />
            <div className={styles.onBoardingHeading}>
              Built on Lens, for Lens Frens
            </div>
          </div>
          {index === 2 && (
            <>
              <div className={styles.welcomeText}>Welcome to</div>
              <div>
                <HotOrNot />
              </div>
              <div className={styles.heading}>
                {onBoardingDetailsArray.title}
              </div>
              <div className={styles.subHeading}>
                Click <FireSmallSvg height={26} width={24} /> to move to the
                next card
              </div>
              <div className="absolute w-[104px] h-[143px] top-[383px]">
                {onBoardingDetailsArray.svg}
              </div>
            </>
          )}

          {index < 2 && (
            <>
              <div className="pt-[38px]">{onBoardingDetailsArray.svg}</div>
              <div className={styles.heading}>
                {onBoardingDetailsArray.title}
                {onBoardingDetailsArray.title2 && (
                  <>
                    <span className="w-full">&</span>
                    <span>{onBoardingDetailsArray.title2}</span>
                  </>
                )}
              </div>
              <div className={`flex ${styles.nextCardBtnText}`}>
                Click
                <FireSmallGreySvy />
                {index === 0
                  ? " to get started "
                  : " to move to the next card "}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default OnboardingContent;
