import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Generate.module.scss";
import UserInput from "./UserInput";
import ImageLoader from "../NONImage/ImageLoader";

export default function GeneratedImage({
  ele,
  index,
  imageLoaded,
  setImageLoaded,
}) {
  const isLoadingCompleted = () => {
    setImageLoaded(true);
  };
  return (
    <div key={ele?.imageUrl || index} className={styles.emptyImageCell}>
      {!imageLoaded && (
        <div className={`${styles.generateImage} z-[1] absolute`}>
          <ImageLoader color={"#000"} height={15} width={15} />
        </div>
      )}
      <div className="h-[inherit] w-[100%] relative">
        {console.log("imageLoaded", imageLoaded)}
        <Image
          style={{ opacity: imageLoaded ? 1 : 0 }}
          src={ele.imageUrl}
          priority={true}
          alt={"nftImage"}
          width={512}
          height={512}
          onLoadingComplete={isLoadingCompleted}
          className="h-full w-full rounded-[10px] overflow-hidden relative"
        />
        <UserInput
          key={index}
          image={ele.imageUrl}
          onSubmitToVote={() => onSubmitToVote(ele)}
          style={styles.masterpeice}
          onSubmit={(value) => {
            ele.title = value;
          }}
          oldImageTitle={ele.title}
        />
      </div>

      {/* <div
                          style={{
                            backgroundImage: `url(${ele.imageUrl})`,
                          }}
                          className="h-full w-full rounded-[10px] overflow-hidden relative"
                        >
                          <UserInput
                            key={index}
                            image={ele.imageUrl}
                            onSubmitToVote={() => onSubmitToVote(ele)}
                            style={styles.masterpeice}
                            onSubmit={(value) => {
                              ele.title = value;
                            }}
                            oldImageTitle={ele.title}
                          />
                        </div> */}
    </div>
  );
}
