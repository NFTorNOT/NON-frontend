import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Generate.module.scss";
import UserInput from "./UserInput";
import ImageLoader from "../NONImage/ImageLoader";

export default function GeneratedImage({ ele, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const onLoadCompleteHandler = () => {
    setImageLoaded(true);
  };
  return (
    <div className={styles.emptyImageCell}>
      {!imageLoaded && (
        <div className={`${styles.generateImage} z-[1] absolute`}>
          <ImageLoader color={"#fff"} height={15} width={15} />
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
          onLoadingComplete={onLoadCompleteHandler}
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
