import React from "react";
import { LensIconSvg } from "../vote/svg/LensIconSvg";
import styles from "./SmallScreen.module.scss";
import SmallScreenData from "./SmallScreenData";

function JoinedFromTablet() {
  let data = [1, 2, 3];
  return (
    <div className="flex flex-col items-center justify-center">
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
              <div className={`${styles.card}`}>
                <div className={styles.smallScreenCard}>
                  <div className={styles.headingContainer}>
                    <LensIconSvg />
                    <div className={styles.smallScreenHeading}>
                      Built on Lens, for Lens Frens
                    </div>
                  </div>
                  <SmallScreenData />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default JoinedFromTablet;
