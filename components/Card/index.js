import React, { useEffect, useRef, useState } from "react";
import LensSvg from "../vote/svg/lensSvg";
import ShowPromptSvg from "../vote/svg/showPromptSvg";
import HidePromptSvg from "../vote/svg/hidePromptSvg";
import styles from "./Card.module.scss";
import Collect from "../CollectNFT/SubComponent/SVG/collect";
import Image from "next/image";

export default function Card({ cardDetails, showCollectModal,style }) {
  const hoverWrapperRef = useRef();
  const bioParentWrapperRef = useRef();
  const titleWrapperRef = useRef();
  const handleWrapperRef = useRef();
  const descriptionWrapperRef = useRef();
  const collectButtonRef = useRef();

  const [wrapperTransY, setWrapperTransY] = useState(1000);
  const [showHandleTimeout, setShowHandleTimeout] = useState(0);

  const [showPrompt, setShowPrompt] = useState(false);

  const promtStatusText = showPrompt ? "Hide Prompt" : "Show Prompt";
  const promtStatusIcon = showPrompt ? <HidePromptSvg /> : <ShowPromptSvg />;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (bioParentWrapperRef && bioParentWrapperRef?.current) {
      setWrapperTransY(bioParentWrapperRef.current?.clientHeight);
    }
  }, []);

  let cardTransHover = () => {
    showTitle();
  };

  let cardTransOut = () => {
    clearTimeout(showHandleTimeout);
    hideAll();
  };

  const hideAll = () => {
    if (showPrompt) {
      // do nothing
      return;
    }
    // title hide Animation
    const wrapHeight = bioParentWrapperRef.current?.clientHeight;
    // Do we really need to do anything?
    if (wrapperTransY < wrapHeight) {
      setWrapperTransY(wrapHeight);
    }
  };

  const showTitle = () => {
    // title Show Animation
    const titleHeight = titleWrapperRef.current?.clientHeight;
    const wrapHeight = bioParentWrapperRef.current?.clientHeight;

    // Do we really need to do anything?
    if (wrapperTransY >= wrapHeight - titleHeight) {
      setWrapperTransY(wrapHeight - titleHeight);
    } else {
      return;
    }
  };

  const showHandle = () => {
    const titleHeight = titleWrapperRef.current?.clientHeight;
    const wrapHeight = bioParentWrapperRef.current?.clientHeight;
    const handleHeight = handleWrapperRef.current?.clientHeight;
    const collectButtonHeight = collectButtonRef?.current?.clientHeight + 30;

    if (wrapperTransY <= wrapHeight - titleHeight) {
      //Check if handle is visible.
      if (
        wrapperTransY >=
        wrapHeight - titleHeight - handleHeight - collectButtonHeight
      ) {
        if (showPrompt) {
          setWrapperTransY(0);
        } else {
          setWrapperTransY(
            wrapHeight - titleHeight - handleHeight - collectButtonHeight
          );
        }
      }
    }
  };

  const ViewOnLensClick = () => {
    let viewLensUrl =
      "https://testnet.lenster.xyz/posts/" + cardDetails?.lensPublicationId;
    window.open(viewLensUrl, "_blank");
  };

  const ViewProfileonLens = () => {
    let viewLensUrl = "https://testnet.lenster.xyz/u/" + cardDetails?.handle;
    window.open(viewLensUrl, "_blank");
  };

  useEffect(() => {
    const titleHeight = titleWrapperRef.current?.clientHeight;
    const wrapHeight = bioParentWrapperRef.current?.clientHeight;

    if (wrapperTransY === wrapHeight - titleHeight) {
      // Showing title, show handle soon.
      setShowHandleTimeout(
        setTimeout(() => {
          showHandle();
        }, 500)
      );
    }
  }, [wrapperTransY]);

  const togglePrompt = () => {
    setShowPrompt(!showPrompt);
  };

  useEffect(() => {
    const titleHeight = titleWrapperRef.current?.clientHeight;
    const wrapHeight = bioParentWrapperRef.current?.clientHeight;
    const handleHeight = handleWrapperRef.current?.clientHeight;
    const descriptionHeight = descriptionWrapperRef.current?.clientHeight;
    const collectButtonHeight = collectButtonRef?.current?.clientHeight;

    if (showPrompt) {
      // console.log("here in showPrompt");
      setWrapperTransY(0);
    } else if (wrapperTransY < wrapHeight - descriptionHeight) {
      setWrapperTransY(
        wrapHeight - titleHeight - handleHeight - collectButtonHeight
      );
    }
  }, [showPrompt]);

  ;
  return (
    <div
      className={`${styles.card}`}
      style={Object.assign({}, style,{ backgroundImage: `url(${cardDetails.image})`})}
      ref={hoverWrapperRef}
      onMouseEnter={cardTransHover}
      onMouseLeave={cardTransOut}
    >
      <div
        className={`${styles.card_title_overlay}`}
        ref={bioParentWrapperRef}
        style={{ transform: `translateY(${wrapperTransY}px)` }}
      >
        <div
          className={`${styles.card_title} flex justify-between items-center`}
          ref={titleWrapperRef}
        >
          <div className={`${styles.card_title_text} mr-[25px]`}>
            {cardDetails.title}
          </div>
          <div className="text-[#ffffff] flex items-center">
            <div
              className={`cursor-pointer ${styles.lensSvg}`}
              onClick={ViewOnLensClick}
            >
              <LensSvg />
            </div>
          </div>
        </div>

        <div className={`${styles.showPrompt}`} ref={handleWrapperRef}>
          <div
            className={`${styles.id} hover:text-[#adff00] cursor-pointer`}
            onClick={ViewProfileonLens}
          >
            @{cardDetails.handle}
          </div>
          <div
            className="text-white text-opacity-60 cursor-pointer transition flex items-center gap-1"
            onClick={togglePrompt}
          >
            {promtStatusIcon} {promtStatusText}
          </div>
        </div>

        {showPrompt ? (
          <div
            className={`${styles.description} flex items-center justify-between`}
            ref={descriptionWrapperRef}
          >
            {cardDetails.description}
          </div>
        ) : null}
        <button
          ref={collectButtonRef}
          className={`${styles.collectButton}  flex items-center justify-center`}
          onClick={() => {
            // showModal(ele);
            showCollectModal(cardDetails);
          }}
        >
          <span>
            <Collect />
          </span>
          <span className="font-normal text-[16px] leading-[26px] ml-[8px]">
            {cardDetails.hasCollected ? "Collect Again" : "Collect Now"}
          </span>
        </button>
      </div>
      <div
        className={` absolute top-[16px] rounded-[4px] right-[16px] bg-black/60 px-[8px] py-[6px] flex gap-[5px] items-center`}
      >
        <span>
          <Image
            src="https://static.plgworks.com/assets/images/non/flame-icon.png"
            alt="Lens Icon"
            width="19"
            height="19"
          />
        </span>
        <span className="font-medium text-[16px] leading-[26px] text-[#ffffff] ml-[3px]">
          {cardDetails.totalVotes}
        </span>
      </div>
    </div>
  );
}
