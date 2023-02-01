import React from "react";
import { LensIconSvg } from "../vote/svg/LensIconSvg";
import styles from "./SmallScreen.module.scss";
import hotOrNotgif from "../onBoarding/gif/hotOrNot.gif";
import Image from "next/image";

function JoinedFromSmallScreen() {
  let data = [1, 2, 3];
  return (
    <div className="flex items-center justify-center">
      <div
        id="vote-card"
        className={`${styles.cardContainer} flex justify-center mt-[25px] mb-[15px] order-2 aspect-[512/512] h-[520px] ${styles.voteCards}`}
      >
        {data.length > 0 &&
          data.map((index) => (
            <div
              key={index}
              className={`absolute pressable  ${styles.voteCard}`}
            >
              <div>
                <div className={`${styles.card}`}>
                  <div className={styles.onBoardingCard}>
                    <div className={styles.headingContainer}>
                      <LensIconSvg />
                      <div className={styles.onBoardingHeading}>
                        Built on Lens, For Lens Frens
                      </div>
                    </div>
                    <div className="pt-[38px]">
                      <Image
                        src={hotOrNotgif}
                        width={267}
                        height={160}
                        alt="my gif"
                      />
                    </div>
                    <div className={styles.heading}>Welcome to NFT or Not</div>
                    <div className={styles.subHeading1}>
                      A fun new take on Hot or Not, but for NFT’s. Vote NFTS’s,
                      Collect them and easily generate your own NFT’s to submit.
                    </div>
                    <div>
                      <p className={styles.subHeading2}>
                        This experience is unavailable for tablet and mobile
                        devices, can be viewed on desktop only.
                      </p>
                      <div className="mt-[20px] flex justify-center">
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.74995 6.49999H16.25M5.19995 5.19998V20.8C5.19995 22.2359 6.36401 23.4 7.79995 23.4H18.2C19.6359 23.4 20.8 22.2359 20.8 20.8V5.19999C20.8 3.76405 19.6359 2.59999 18.2 2.59999L7.79996 2.59998C6.36401 2.59997 5.19995 3.76403 5.19995 5.19998ZM13 18.2H13.092V18.2833H13V18.2Z"
                            stroke="#747272"
                            stroke-width="1.95"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.59998 22.1333L21.45 3.28333"
                            stroke="#747272"
                            stroke-width="1.95"
                            stroke-linecap="round"
                          />
                          <path
                            d="M2.59998 20.15L21.45 1.30005"
                            stroke="#020202"
                            stroke-width="1.95"
                            stroke-linecap="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default JoinedFromSmallScreen;
