import React from "react";
import styles from "./SmallScreen.module.scss";

function JoinedFromSmallScreen() {
  let data = [1, 2, 3];
  return (
    <div className="flex items-center justify-center">
      <div
        id="vote-card"
        className={`${styles.cardContainer} flex justify-center mt-[25px] mb-[15px] order-2 aspect-[512/512] h-[520px] cursor-grab ${styles.voteCards}`}
      >
        {data.length > 0 &&
          data.map((index) => (
            <div
              key={index}
              className={`absolute pressable  ${styles.voteCard}`}
            >
              <div className={`${styles.card}`}>
                <h1>hello00000</h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default JoinedFromSmallScreen;
