import styles from "./Vote.module.scss";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PublicationApi, { ReactionType } from "../../graphql/PublicationApi";
import { useUserContext } from "../../context/UserContext";
import { useAuthContext } from "../../context/AuthContext";
import Not from "./svg/not";
import FireSvg from "./svg/FireSvg";
import TrendingThemeDefault from "./TrendingThemeDefault";
import ClickOnHot from "./svg/clickOnHot";
import { ReactionTypes } from "../../utils/Constants";
import VoteCard from "./voteCard";
import { axiosInstance } from "../../AxiosInstance";
import { useCollectedNFTModalContext } from "../../context/CollectedNFTModalContext";
import CustomSignInModal from "../CustomSignInModal";
import TrendingThemeModal from "../TrendingThemeModal";
import CollectIconSvg from "./svg/CollectIconSvg";
import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems, TabNames } from "../Main/TabItems";
import Router from "next/router";
import OnBoarding from "../OnBoarding";

export default function VoteImage() {
  const { userProfile } = useUserContext();

  const [imageIndex, setImageIndex] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [themesData, setThemesData] = useState([]);
  const [isNotButtonClicked, setIsNotButtonClicked] = useState(false);
  const [isHotButtonClicked, setIsHotButtonClicked] = useState(false);
  const [shouldShowSignInModal, setShouldShowSignInModal] = useState(false);
  const [
    shouldShowWhatIsTremdingThemeModal,
    setShouldShowWhatIsTrendingThemeModal,
  ] = useState(false);
  const [data, setData] = useState([]);
  const allTrendingThemes = useRef([]);

  const { isUserLoggedIn } = useAuthContext();
  const isVoteInProgress = useRef(false);

  const childRefs = useRef();

  const PAGINATION_ITEM_COUNT = 7;

  const allData = useRef([]);

  const consumedData = useRef([]);

  let hasNextPageIdentifier = useRef(null);

  const { setIsUpvoted, isUpvoted } = useCollectedNFTModalContext();

  const { onTabChange } = useBottomTab();
  const isFirstTimeLoaded = useRef(false);

  setTimeout(() => {
    isFirstTimeLoaded.current = true;
  }, 4000);

  async function fetchLensPost() {
    const lensPostData = await axiosInstance.get(`/nfts`, {
      params: {
        pagination_identifier: hasNextPageIdentifier.current,
      },
    });

    const lensPostResponseData =
      lensPostData && lensPostData.data && lensPostData.data.data;

    if (!lensPostResponseData) {
      // TODO:DS : Show Response Err
      return;
    }

    const nextPagePayload =
      lensPostResponseData.meta && lensPostResponseData.meta.next_page_payload;
    hasNextPageIdentifier.current =
      nextPagePayload && nextPagePayload.pagination_identifier;

    const lensPostIdsArr = lensPostResponseData.lens_posts_ids;
    const lenstPostsMap = lensPostResponseData.lens_posts;
    const lensPostImagesMap = lensPostResponseData.images;
    const lensPostTextMap = lensPostResponseData.texts;
    const usersMap = lensPostResponseData.users;
    const themesMap = lensPostResponseData.themes;
    const activeThemes = lensPostResponseData.active_theme_ids;
    const lensPostDetails = [];

    let trendingThemes = [];
    for (let i = 0; i < activeThemes.length; i++) {
      let theme = Object.values(themesMap)?.find(
        (theme) => theme.id == activeThemes[i]
      );
      trendingThemes.push(theme);
    }
    allTrendingThemes.current = [...trendingThemes];
    // for (let i = 1; i <= 3 && themes.length <= 3; i++) {
    //   const isAlreadyPresent = themes.some(
    //     (el) => el.themeName === themesMap[i]?.name
    //   );

    //   if (!isAlreadyPresent && themesMap[i]?.id && themesMap[i]?.name) {
    //     themes.push({
    //       id: themesMap[i]?.id,
    //       themeName: themesMap[i]?.name,
    //     });
    //   }
    // }

    // setThemesData(themes);

    for (let cnt = 0; cnt < lensPostIdsArr.length; cnt++) {
      const lensPost = lenstPostsMap[lensPostIdsArr[cnt]];

      if (!lensPost) {
        continue;
      }

      const descriptionTextId = lensPost.description_text_id,
        imageId = lensPost.image_id,
        owneUserId = lensPost.owner_user_id,
        themeId = lensPost.theme_id,
        imageObj = lensPostImagesMap && lensPostImagesMap[imageId],
        textObj = lensPostTextMap && lensPostTextMap[descriptionTextId],
        themesObj = themesMap && themesMap[themeId],
        userObj = usersMap && usersMap[owneUserId];

      lensPostDetails.push({
        publicationId: lensPost.lens_publication_id,
        lensPostId: lensPostIdsArr[cnt],
        themeName: themesObj.name,
        url: imageObj.url,
        title: lensPost.title,
        txHash: lensPost.nft_mint_transaction_hash,
        description: textObj.text,
        handle: userObj?.lens_profile_username,
        filter: lensPost?.filter,
      });
    }

    makeData(lensPostDetails);
  }

  function makeData(dataList) {
    allData.current = [...allData.current, ...dataList];
  }

  const loadMore = async (isFirstTime) => {
    const shouldSliceNextSetOfData =
      consumedData.current.length - 1 - imageIndex;

    if (isFirstTime || shouldSliceNextSetOfData <= 1) {
      await slicedNextSetOfData(isFirstTime);
    }
  };

  async function slicedNextSetOfData(isFirstTime) {
    if (
      isFirstTime ||
      (allData.current.length - consumedData.current.length <
        PAGINATION_ITEM_COUNT &&
        hasNextPageIdentifier.current)
    ) {
      if (isFirstTime) {
        do {
          await fetchLensPost();
        } while (allData.current.length <= 0 && hasNextPageIdentifier.current);
      } else {
        await fetchLensPost();
      }
    }
    let sliceNextSetOfData = allData.current.slice(
      consumedData.current.length,
      consumedData.current.length + PAGINATION_ITEM_COUNT
    );
    consumedData.current = [...consumedData.current, ...sliceNextSetOfData];
    childRefs.current = Array(consumedData.current.length)
      .fill(0)
      .map((i) => React.createRef());
    setSelectedTheme(consumedData.current[imageIndex]?.themeName);
  }

  useEffect(() => {
    setData(
      consumedData.current
        .slice(imageIndex, imageIndex + PAGINATION_ITEM_COUNT)
        .reverse()
    );

    return () => {};
  }, [imageIndex, consumedData.current.length]);

  useEffect(() => {
    setTimeout(async () => {
      await loadMore(true);
    }, 2000);
  }, []);

  function showNextImage() {
    setImageIndex((imageIndex) => imageIndex + 1);
    setSelectedTheme(consumedData.current[imageIndex]?.themeName);
  }

  async function upvoteImage({ publicationId }) {
    try {
      const res = await PublicationApi.addReaction({
        profileId: userProfile?.lens_profile_id,
        reactionType: ReactionType.UPVOTE,
        publicationId: publicationId.toString(),
      });
    } catch (error) {
      console.log({ error });
    }
  }

  const submitVote = (dir) => {
    if (!isUserLoggedIn) {
      setShouldShowSignInModal(true);
      return;
    }
    if (isVoteInProgress.current) {
      return;
    }
    setSelectedTheme(consumedData.current[imageIndex]?.themeName);

    isVoteInProgress.current = true;

    const lensPostId = consumedData.current[imageIndex]?.lensPostId;
    const publicationId = consumedData.current[imageIndex]?.publicationId;

    // console.log({ lensPostId, publicationId });
    axiosInstance
      .post(`/reaction`, {
        reaction: dir == "right" ? ReactionTypes.VOTED : ReactionTypes.IGNORED,
        lens_post_id: lensPostId,
      })
      .finally(() => {
        isVoteInProgress.current = false;
      });
    upvoteImage({ publicationId });
  };

  const swiped = async (dir) => {
    if (!isUserLoggedIn) {
      setShouldShowSignInModal(true);
      return;
    }

    animatecard(dir);
    setTimeout(async () => {
      if (dir == "right") {
        setIsUpvoted(!isUpvoted);
      }
      submitVote(dir);
      await loadMore();

      showNextImage();
    }, 800);
  };

  const canSwipe = imageIndex >= 0;

  const swipeAnimation = async (dir) => {
    if (canSwipe && imageIndex < consumedData.current.length) {
      // await childRefs.current?.[imageIndex]?.swipe(dir);
    }
  };

  let styleSheet = null;
  const dynamicHotAnimation = () => {
    if (!styleSheet) {
      styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      document.head.appendChild(styleSheet);
    }

    styleSheet.sheet.insertRule(
      `@keyframes newAnimation {
      from {
        transform: rotate(0deg);
        opacity: 1;
      }
      to {
        transform: rotate(15deg) translateX(180px);
        opacity: 0;
      }
    }`,
      styleSheet.length
    );
  };

  const dynamicNotAnimation = () => {
    if (!styleSheet) {
      styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      document.head.appendChild(styleSheet);
    }

    styleSheet.sheet.insertRule(
      `@keyframes newAnimation {
      from {
        transform: rotate(0deg);
        opacity: 1;
      }
      to {
        transform: rotate(-15deg) translateX(-180px);
        opacity: 0;
      }
    }`,
      styleSheet.length
    );
  };

  const animatecard = (dir) => {
    let voteCard = document.getElementById("vote-card");
    var lastChild = voteCard.lastElementChild;
    lastChild.setAttribute("id", "lastvoteCard");
    let demoIdVar = document.getElementById("lastvoteCard");
    dir == "left"
      ? dynamicNotAnimation("newAnimation", demoIdVar.value)
      : dynamicHotAnimation("newAnimation", demoIdVar.value);
    demoIdVar.style.animation = "newAnimation 1s";
  };

  const onCollectButtonClick = () => {
    onTabChange(TabItems[TabNames.NftOfTheDay]);
    Router.push({ pathname: "/collect" });
  };

  const [onBoarding, setOnBoarding] = React.useState(true);
  let onBoardingKey;
  React.useEffect(() => {
    console.log(typeof localStorage.getItem("onBoardingKey"));
    if (localStorage.getItem("onBoardingKey") === "false") {
      console.log("inside :", !localStorage.getItem("onBoardingKey"));
      setOnBoarding(false);
    }
  }, []);

  return onBoarding ? (
    <OnBoarding setOnBoarding={setOnBoarding} />
  ) : (
    <div className="flex items-center justify-center flex-col">
      <TrendingThemeDefault
        selectedTheme={selectedTheme}
        trendingThemes={allTrendingThemes.current}
        showTrendingThemeModal={() => {
          setShouldShowWhatIsTrendingThemeModal(true);
        }}
      />

      <div className="relative md:flex justify-center md:items-center mt-[40px]">
        {/* <NFTContractInfoModal
          visible={nftDetailsModal}
          onClose={() => setNftDetailsModal(false)}
          ipfsCid={ipfs}
          txHash={consumedData.current[imageIndex]?.txHash}
        /> */}

        <CustomSignInModal
          isOpen={shouldShowSignInModal}
          onRequestClose={() => setShouldShowSignInModal(false)}
        />

        <TrendingThemeModal
          isOpen={shouldShowWhatIsTremdingThemeModal}
          onRequestClose={() => setShouldShowWhatIsTrendingThemeModal(false)}
        />

        <div
          id="vote-card"
          className={`${styles.cardContainer} flex justify-center mt-[25px] mb-[15px] order-2 aspect-[512/512] h-[520px] cursor-grab ${styles.voteCards}`}
        >
          {data.length > 0 &&
            data.map((character, index) => (
              <div className={`absolute pressable  ${styles.voteCard}`}>
                <VoteCard character={character}></VoteCard>
              </div>
            ))}

          {data.length == 0 && isFirstTimeLoaded.current ? (
            <div className={`absolute pressable  ${styles.voteCard}`}>
              <div className={styles.emptyCard}>
                <div className={styles.emptyText}>
                  Oops, all generations are exhausted. Meanwhile, Collect hot
                  NFTs by your lens frens and show your support💰
                </div>
                <div
                  className={styles.collectButtonContainer}
                  onClick={onCollectButtonClick}
                >
                  <CollectIconSvg />
                  <div className={styles.collectButtonText}>Collect Now</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {consumedData.current.length > 0 ? (
          <>
            <button
              className={`absolute md:relative left-0`}
              disabled={isNotButtonClicked || data.length == 0}
              onClick={() => {
                if (!isUserLoggedIn) {
                  setShouldShowSignInModal(true);
                  return;
                }
                swiped("left");
                setIsNotButtonClicked(true);
                setTimeout(() => {
                  setIsNotButtonClicked(false);
                }, 2000);
              }}
            >
              <div
                className={`${styles.buttonClassNot} ${
                  !isNotButtonClicked ? `block` : `hidden`
                } m-[8px]`}
              >
                <Not />
              </div>
              <div
                className={`${styles.buttonClassNot} ${
                  isNotButtonClicked ? `block` : `hidden`
                }`}
              >
                <ClickOnHot />
              </div>
            </button>

            <button
              className={`absolute md:relative right-0 order-last`}
              disabled={isHotButtonClicked || data.length == 0}
              onClick={() => {
                if (!isUserLoggedIn) {
                  setShouldShowSignInModal(true);
                  return;
                }
                swiped("right");
                setIsHotButtonClicked(true);
                setTimeout(() => {
                  setIsHotButtonClicked(false);
                }, 2000);
              }}
            >
              <div
                className={`${styles.buttonClassHot} ${
                  !isHotButtonClicked ? `block` : `hidden`
                } m-[8px]`}
              >
                <FireSvg />
              </div>
              <div
                className={`${styles.buttonClassHot} ${
                  isHotButtonClicked ? `block` : `hidden`
                }`}
              >
                <Image
                  src="https://static.plgworks.com/assets/images/non/vote/hotButtonClick.png"
                  alt="Lens Icon"
                  width="72"
                  height="72"
                />
              </div>
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
