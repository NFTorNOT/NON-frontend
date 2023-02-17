import React from "react";
import styles from "./hallOfFlameModal.module.scss";
import Image from "next/image";
import LeftArrow from "./SVG/leftArrow";
import RightArrow from "./SVG/rightArrow";
import HofCross from "./SVG/hofCross";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";
import { TRENDING_THEMES } from "../../../utils/Constants";
import Card from "../../Card";
import OutsideClickHandler from 'react-outside-click-handler';

function HallOfFlameModal({
  shown,
  close,
  hallOfFlameData,
  initialSlide,
  onCollectNow,
}) {
  const Themes = TRENDING_THEMES;  
  return shown ? (
    <div
      className={styles.modalBackdrop}
      onClick={(e) => {
        // do not close modal if anything inside modal content is clicked
        e.stopPropagation();
      }}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <button onClick={close} className="absolute top-[7.64%] right-[7.64%]">
          <HofCross />
        </button>

        <Swiper
          initialSlide={initialSlide}
          slidesPerView={1}
          spaceBetween={30}
          slidesPerGroup={1}
          modules={[Navigation]}
          navigation={{
            enabled: true,
            nextEl: ".modalNext",
            prevEl: ".modalPrev",
          }}
        >
          {hallOfFlameData.length > 0 &&
            hallOfFlameData.map((ele, index) => {
              // console.log("hallOfFlameData", { ele });
              return (
                <SwiperSlide key={index}>
                  <div className="w-full">
                    <div className="flex items-center justify-center">
                      <span className="mr-[8px] font-bold text-[20px] leading-[32px] text-[#ffffff]">
                        Hall of Flame
                      </span>
                      <span>
                        <Image
                          src="https://static.plgworks.com/assets/images/non/flame-icon.png"
                          alt="Lens Icon"
                          width="19"
                          height="19"
                        />
                      </span>
                    </div>
                    <div className="flex items-center justify-center mt-[15px] font-bold text-[20px] pb-[15px]">
                      {Themes.length > 0 &&
                        Themes.map((item, index) => {
                          return (
                            <div key={index}>
                              <span
                                className={`${
                                  ele?.theme?.name == item.name
                                    ? "text-[#fff]"
                                    : "text-[#ffffff99]"
                                }`}
                              >
                                #{item.name}
                              </span>
                              {index < Themes.length - 1 ? (
                                <span
                                  className={`${styles.dot} mx-[10px]`}
                                ></span>
                              ) : null}
                            </div>
                          );
                        })}
                    </div>
                      <OutsideClickHandler
                    onOutsideClick={() => {close();}}
                  >
                    <div className="flex items-center justify-center">
                      <div className={`modalPrev mr-[60px] `}>
                    <div
                          className={`${index == 0 ? "hidden" : "flex"} justify-center items-center cursor-pointer w-[72px] h-[72px] bg-black/60 rounded-[100px] ${styles.swiperArrow}`}
                        >
                          <LeftArrow />
                        </div>
                      </div>
                      <Card
                        cardDetails={ele}
                        showCollectModal={() => onCollectNow(ele)}
                      />
                      <div className={`modalNext ml-[60px]`}>
                        <div
                          className={`${index == 9 ? "hidden" : "flex"} justify-center items-center cursor-pointer w-[72px] h-[72px] bg-black/60 rounded-[100px] ${styles.swiperArrow}`}
                        >
                          <RightArrow />
                        </div>
                      </div>
                    {/* <div
                      className={`${styles.card} flex items-center justify-center mt-[20px]`}
                      style={{
                        backgroundImage: `url(${ele.image})`,
                      }}
                    >
                      <div
                        className={`${styles.upvoteCount} flex items-center justify-center`}
                      >
                        <span className="pr-[10px]">
                          <Image
                            src="https://static.plgworks.com/assets/images/non/flame-icon.png"
                            alt="Lens Icon"
                            width="23"
                            height="27"
                          />
                        </span>
                        <span>{ele.totalVotes}</span>
                      </div>
                      <div className={`${styles.nftDetails} p-[15px]`}>
                        <div className="flex items-start justify-between">
                          <div className={styles.nftTitle}>{ele.title}</div>
                          <div>
                            <Image
                              src="https://static.plgworks.com/assets/images/non/vote/lens-icon.png"
                              alt="Lens icon"
                              width="20"
                              height="20"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-[14px] mb-[22px]">
                          <div className="flex items-center font-medium text-[#ffffff99] text-[16px] leading-[26px]">
                            <span>{ele.handle}</span>
                            <span>.</span>
                            <span>Follow</span>
                          </div>
                          <div className="flex items-center font-medium text-[#ffffff99] text-[16px] leading-[26px]">
                            <span></span>
                            <span>Show Prompt</span>
                          </div>
                        </div>
                        {ele.hasCollected ? (
                          <button
                            className={`${styles.collectButton} flex items-center justify-center py-[7px]`}
                          >
                            <span>
                              <Collect />
                            </span>
                            <span className="font-bold text-[16px] leading-[26px] ml-[8px]">
                              You have already collected this
                            </span>
                          </button>
                        ) : (
                          <button
                            className={`${styles.collectButton} flex items-center justify-center py-[7px]`}
                            onClick={() => onCollectNow(ele)}
                          >
                            <span>
                              <Collect />
                            </span>
                            <span className="font-bold text-[16px] leading-[26px] ml-[8px]">
                              Collect Now
                            </span>
                          </button>
                        )}
                      </div>*/}
                    </div> 
                    </OutsideClickHandler>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  ) : null;
}

export default HallOfFlameModal;
