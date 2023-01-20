import Image from "next/image";
import React from "react";
import HotOrNot from "../vote/svg/HotOrNot";
import { LensIconSvg } from "../vote/svg/LensIconSvg";
import styles from "./OnBoarding.module.scss";
import HandGif from "./gif/hand.gif";

const onBoardingDetailsArray = [
  {
    title: "For each image, you Vote whether it is Hot, or Not!",
  },
  {
    title: "Collect hot NFTs by your lens frens to show your support💰",
  },
  {
    title: "Collect hot NFTs by your lens frens to show your support💰",
  },
  {
    title:
      "NFTs with the highest number of Votes will be showcased in the Hall of Flame",
  },
  {
    title:
      "Join in on a thrilling showdown of A.I.-generated images where you and the community cast votes!",
    subText: "Welcome to",
  },
];

function OnBoarding() {
  return (
    <div className="flex items-center justify-center ">
      <div
        id="vote-card"
        className={`${styles.cardContainer} flex justify-center mt-[25px] mb-[15px] order-2 aspect-[512/512] h-[520px] cursor-grab ${styles.voteCards}`}
      >
        {onBoardingDetailsArray &&
          onBoardingDetailsArray.length > 0 &&
          onBoardingDetailsArray.map((ele, index) => {
            // console.log({ index });
            if (index == 1)
              return (
                <div className={`absolute pressable  ${styles.voteCard}`}>
                  <div className={styles.onBoardingCard}>
                    <div className={styles.headingContainer}>
                      <LensIconSvg />
                      <div className={styles.onBoardingHeading}>
                        Built on Lens, For Lens Frens
                      </div>
                    </div>

                    <div className={styles.welcomeText}>Welcome to</div>

                    <HotOrNot />
                    <div className={styles.subHeading}>{ele.title}</div>
                    <div className={styles.description}>
                      Click to move to the next card
                    </div>

                    <Image
                      src={HandGif}
                      width={103}
                      height={244}
                      alt="my gif"
                    />
                  </div>
                </div>
              );
          })}
      </div>
    </div>
  );
}

export default OnBoarding;
