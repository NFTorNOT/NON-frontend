import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./SubmitForVoteModal.module.scss";
import Collect from "./svg/Collect";
import MessageCircle from "./svg/MessageCircle";

function SubmitForVoteModal({
  visible,
  setsubmitToVoteModal,
  clickHandler,
  submitToVoteApiInProgress,
}) {
  const infoMap = [
    {
      svgIcon: <MessageCircle />,
      desc: "When you submit your NFT generation, a post is made on Lens",
    },
    {
      svgIcon: <Collect />,
      desc: "People can collect your NFT on NFT or Not",
    },
    {
      svgIcon: <Collect />,
      desc: "Proceeds from all collects will go to your wallet",
    },
  ];
  if (!visible) {
    return null;
  }
  return (
    <div className="fixed inset-[-35px] z-[11]">
    <div className={styles.popup}>
      <div
        className={`${styles.submitForVoteInfo} py-[40px] px-[30px] relative`}
      >
        <div
          className="absolute top-[20px] right-[10px] text-[#fff] text-[16px] cursor-pointer"
          onClick={() => setsubmitToVoteModal(false)}
        >
          Close
        </div>
        <div className="text-[#fff] font-bold text-[20px] leading-[32px]">
          Submit your generations
        </div>
        {infoMap.map((item, index) => (
          <div className="my-[16px]" key={index}>
            {item.svgIcon}
            <div className="text-[#fff] text-[16px] mt-[10px]">{item.desc}</div>
          </div>
        ))}
        <div>
          <div className={`${styles.submitVote} mt-[30px]`}>
            {submitToVoteApiInProgress ? (
              <div className="flex items-center justify-center gap-[6px]">
                <ClipLoader color={"#fff"} loading={true} size={15} />
                <span>Submit for voting </span>
              </div>
            ) : (
              <button className="w-full h-full" onClick={() => clickHandler()}>
                + Submit for voting{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SubmitForVoteModal;
