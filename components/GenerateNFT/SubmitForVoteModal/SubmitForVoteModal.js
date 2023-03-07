import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./SubmitForVoteModal.module.scss";
import Collect from "./svg/Collect";
import MessageCircle from "./svg/MessageCircle";
import Modal from "react-modal";
import HofCross from "../../CollectNFT/SubComponent/SVG/hofCross";

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
  const [btnClicked, setIsBtnClicked] = React.useState(false);

  const customStyles = {
    content: {
      background:
        "background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)",
      backdropFilter: "blur(60px)",
      borderRadius: "12px",
      borderColor: "#000000",
      height: "fit-content",
      width: "fit-content",
      margin: "auto",
      padding: "0px",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.6)",
    },
  };

  return (
    <Modal
      onRequestClose={() => setsubmitToVoteModal(false)}
      isOpen={visible}
      style={customStyles}
    >
      <div
        className={`${styles.submitForVoteInfo} py-[40px] px-[30px] relative`}
      >
        <div
          className="absolute top-[20px] right-[10px] text-[#fff] text-[16px] cursor-pointer scale-[0.42]"
          onClick={() => setsubmitToVoteModal(false)}
        >
          <HofCross />
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
          <div
            className={`${styles.submitVote} ${
              btnClicked ? "cursor-not-allowed	pointer-events-none" : ""
            } mt-[30px]`}
          >
            {submitToVoteApiInProgress ? (
              <div className="flex items-center justify-center gap-[6px]">
                <ClipLoader color={"#fff"} loading={true} size={15} />
                <span>Submit for voting </span>
              </div>
            ) : (
              <button
                className="w-full h-full"
                onClick={() => {
                  setIsBtnClicked(true);
                  clickHandler();
                }}
              >
                + Submit for voting{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SubmitForVoteModal;
