import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../Main/TabItems";
import styles from "./BottomTabSelector.module.scss";
import { TwitterShareButton } from "react-share";
import TwitterIcon from "./svg/TwitterIcon";
import QuestionMarkIcon from "./svg/QuestionMarkIcon";
import Link from "next/link";
import { axiosInstance } from "../../AxiosInstance";
import { useEffect, useState } from "react";
import { useCollectedNFTModalContext } from "../../context/CollectedNFTModalContext";
import { useAuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";
import GithubIcon from "./svg/GithubIcon";

export default function BottomTabSelector() {
  const { currentTab, onTabChange } = useBottomTab();
  const routesMap = {
    SubmitYourOwn: "/generate-image",
    Collect: "/collect",
    Vote: "/",
  };
  const { isUpvoted } = useCollectedNFTModalContext();
  const [recentlyCollectedNFTS, setRecentCollectedNFTS] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const { isUserLoggedIn } = useAuthContext();

  const handleTrueSparrowClick = () => {
    const plgURL = "https://truesparrow.com/";
    window.open(plgURL, "_blank");
  };

  const handleHowItWorks = () => {
    const plgURL =
      "https://www.notion.so/truesparrow/NFT-or-Not-61e944ba261f49a2805c73468c92a43a";
    window.open(plgURL, "_blank");
  };

  const handleGithub = () => {
    const gitHubUrl = "https://github.com/NFTorNOT ";
    window.open(gitHubUrl, "_blank");
  };

  async function fetchRecentUpVotedNFTS() {
    if (!isUserLoggedIn && isUserLoggedIn !== undefined) {
      return;
    }
    if (isUserLoggedIn) {
      try {
        setIsLoading(true);
        const recentUpvotedNFTSResponse = await axiosInstance.get(
          `/recent-upvoted-nfts`
        );
        const recentUpvotedNFTSData = recentUpvotedNFTSResponse.data.data;
        if (!recentUpvotedNFTSData) {
          return;
        }
        const recentUpvotedLensPostIdsArr =
          recentUpvotedNFTSData.lens_posts_ids;
        const recentUpvotedLensPostsMap = recentUpvotedNFTSData.lens_posts;
        const recentUpvotedLensPostImagesMap = recentUpvotedNFTSData.images;
        const recentUpvotedLensPostDetails = [];

        for (let cnt = 0; cnt < recentUpvotedLensPostIdsArr.length; cnt++) {
          const lensPost =
            recentUpvotedLensPostsMap[recentUpvotedLensPostIdsArr[cnt]];

          if (!lensPost) {
            continue;
          }

          let imageId = lensPost.image_id;
          let imageObj =
            recentUpvotedLensPostImagesMap &&
            recentUpvotedLensPostImagesMap[imageId];

          recentUpvotedLensPostDetails.push({
            url: imageObj.url,
          });
        }

        setRecentCollectedNFTS(recentUpvotedLensPostDetails.reverse());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
  }

  const { route } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      fetchRecentUpVotedNFTS();
    }, 3000);
  }, [isUpvoted]);

  return (
    <>
      {route == "/collect" ? (
        <div className={styles.bottomContainer}></div>
      ) : null}
      <div className={`${styles.background} flex items-center`}>
        <div
          className={`${styles.leftBar} flex items-center mt-[12px] md:mt-0 justify-items-start`}
        >
          <button
            className={`${styles.howItWorks} flex items-center justify-start cursor-pointer relative`}
            onClick={handleHowItWorks}
          >
            <QuestionMarkIcon />
            <div
              className={`${styles.hiwText} text-[#ffffff] font-medium absolute w-[100px] left-[25px] top-0`}
            >
              How it works
            </div>
            <div className={styles.hiwSpace}></div>
          </button>

          <TwitterShareButton
            className={`${styles.twitterShare} cursor-pointer ml-[15px] flex`}
            url={"https://truesparrow.com/"}
            title={"Sharing text goes Here"}
          >
            <span className="z-10 pl-[5px]">
              <TwitterIcon />
            </span>
            <span
              className={`${styles.twitterText} pl-[15px] text-[#ffffff] font-medium absolute ml-[20px]`}
            >
              Share on Twitter
            </span>
            <div className={styles.twitterTextSpace}></div>
          </TwitterShareButton>

          <button
            className={`${styles.githubShare} cursor-pointer ml-[15px] flex`}
            onClick={handleGithub}
          >
            <span className="z-10 pl-[5px]">
              <GithubIcon />
            </span>
            <div
              className={`${styles.githubText} pl-[5px] text-[#ffffff] font-medium`}
            >
              Github
            </div>
          </button>
        </div>

        <div
          className={`${styles.container} w-[640px] h-[56px] m-auto grid grid-cols-3 content-center gap-[8px] p-[8px] md:rounded-[100px] col-span-3 relative z-10`}
        >
          {Object.values(TabItems).map((tab) => {
            const isSelected = tab.id === currentTab.id;
            const tabId = tab.id;
            return (
              <Link href={routesMap[tabId]} key={tab.id}>
                <div
                  key={tab.id}
                  onClick={() => onTabChange(tab)}
                  id={tab.id}
                  className={`${styles.tabContainer} ${
                    isSelected ? styles.selectedTab : {}
                  }`}
                  title={tab.tabName}
                >
                  {tab.tabName}
                </div>
              </Link>
            );
          })}
        </div>

        <div className={`${styles.collectedNfts}`}>
          {recentlyCollectedNFTS.length > 0 &&
            currentTab.tabName == "Vote" &&
            recentlyCollectedNFTS.map((ele, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${ele.url})`,
                  }}
                  className="collectedNft absolute left-[24%] top-[85%] w-[200px] h-[200px] rounded-[10px]"
                ></div>
              );
            })}
        </div>

        <button
          className={`${styles.madeWithPLG}  font-medium flex justify-end text-[16px] leading-[26px] text-[#ffffff99] items-center`}
          onClick={handleTrueSparrowClick}
        >
          <span> Made with 🧡 by True Sparrow</span>
        </button>
      </div>
    </>
  );
}
