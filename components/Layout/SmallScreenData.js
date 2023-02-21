import React from "react";
import styles from "./SmallScreen.module.scss";
import Image from "next/image";

function SmallScreenData() {
  return (
    <>
      <div className={`${styles.nonMobileSvg} `}>
        <img
          src={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/mobileview/mobileLogo.png`}
          alt="NFT logo"
        />
      </div>
      <div className="pt-[38px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/mobileview/smallScreenImage.png`}
          width={267}
          height={160}
          alt="my image"
        />
      </div>
      <div className={styles.heading}>Welcome to NFT or Not</div>
      <div className={styles.subHeading1}>
        Experience the 2000s craze, Hot-or-Not, revived and transformed into a
        sensational social experiment using generative AI and Lens.
      </div>
      <div>
        <p className={styles.subHeading2}>Available only on desktop</p>
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
              strokeWidth="1.95"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.59998 22.1333L21.45 3.28333"
              stroke="#747272"
              strokeWidth="1.95"
              strokeLinecap="round"
            />
            <path
              d="M2.59998 20.15L21.45 1.30005"
              stroke="#020202"
              strokeWidth="1.95"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default SmallScreenData;
