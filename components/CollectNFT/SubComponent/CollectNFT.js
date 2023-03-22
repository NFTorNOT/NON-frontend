import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./CollectNFT.module.scss";
import collectNFTModalStyles from "./collectModal.module.scss";
import CollectNFTModal from "./collectNFTModal";
import { axiosInstance } from "../../../AxiosInstance";
import { useAuthContext } from "../../../context/AuthContext";
import { ClipLoader } from "react-spinners";
import Card from "../../Card";
import UserApi from "../../../graphql/UserApi";
import { useAccount } from "wagmi";
import CustomSignInModal from "../../CustomSignInModal";
import EnableDispatcherModal from "../../EnableDispatcherModal";
import { useBottomTab } from "../../../context/BottomTabContext";
import { TabItems, TabNames } from "../../Main/TabItems";
import Router from "next/router";

function CollectNFT(props) {
  const [modalShown, toggleModal] = useState(false);
  const { isUserLoggedIn } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState();
  const [collectData, setCollectData] = useState([]);
  const { address } = useAccount();
  const [isDispatcherEnabled, setIsDispatcherEnabled] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showDispatcherModal, setShowDispatcherModal] = useState(false);
  const isFirstTimeLoading = useRef(false);
  const allData = useRef([]);
  let hasNextPageIdentifier = useRef(null);
  const { onTabChange } = useBottomTab();

  const fetchCollectData = async () => {
    try {
      setIsLoading(true);
      const collectApiResponse = await axiosInstance.get("collect-nfts", {
        params: {
          pagination_identifier: hasNextPageIdentifier.current,
        },
      });

      if (collectApiResponse.data.success) {
        const collectData = collectApiResponse.data.data;
        const lensPosts = collectData?.lens_posts_ids;
        const lensPostDetails = collectData?.lens_posts;
        const lensPostDetailsImages = collectData?.images;
        const lensPostDetailsTexts = collectData?.texts;
        const currentUserLensPostRelations =
          collectData?.current_user_lens_post_relations;
        const users = collectData?.users;
        const nextPagePayload =
          collectData.meta && collectData.meta.next_page_payload;
        hasNextPageIdentifier.current =
          nextPagePayload && nextPagePayload.pagination_identifier;

        let data = [];
        for (let i = 0; i < lensPosts.length; i++) {
          const lensPostDetail = Object.values(lensPostDetails)?.find(
            (post) => post.id == lensPosts[i]
          );

          const lensPostImageDetail = Object.values(
            lensPostDetailsImages
          )?.find((image) => image.id == lensPostDetail.image_id);
          const lensPostTextDetails = Object.values(lensPostDetailsTexts)?.find(
            (text) => text.id == lensPostDetail.description_text_id
          );

          const currentUserLensPostRelation = Object.values(
            currentUserLensPostRelations
          )?.find(
            (lensPost) =>
              lensPost.id == lensPostDetail.current_user_lens_post_relation_id
          );

          const ownerUser = Object.values(users)?.find(
            (user) => user.id == lensPostDetail.owner_user_id
          );

          let postData = {
            title: lensPostDetail?.title,
            description: lensPostTextDetails?.text,
            image: lensPostImageDetail?.url,
            lensPublicationId: lensPostDetail?.lens_publication_id,
            lensId: lensPostDetail?.id,
            lensProfileOwnerAddress: ownerUser.lens_profile_owner_address,
            hasCollected:
              !!currentUserLensPostRelation?.collect_nft_transaction_hash,
            handle: ownerUser?.lens_profile_username,
            totalVotes: lensPostDetail?.total_votes,
          };

          data.push(postData);
        }
        allData.current = [...data, ...allData.current];
        setCollectData(data);
        setTimeout(() => {
          isFirstTimeLoading.current = true;
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const showModal = async (ele) => {
    //removed to allow multiple collect
    // if (ele.hasCollected) {
    //   return;
    // }
    dispatcherCheck();
    setModalData({ ...ele });
    setShowSignInModal(!isUserLoggedIn);

    toggleModal(!modalShown);
  };

  const dispatcherCheck = async () => {
    const defaultProfileResponse = await UserApi.defaultProfile({
      walletAddress: address,
    });

    const defaultProfile = defaultProfileResponse?.data?.defaultProfile;

    if (!defaultProfile?.dispatcher?.address) {
      setIsDispatcherEnabled(false);
    } else setIsDispatcherEnabled(true);
    setShowDispatcherModal(!isDispatcherEnabled);
  };
  useEffect(() => {
    allData.current = [];
    if (isUserLoggedIn) {
      fetchCollectData();
    }
  }, [isUserLoggedIn]);

  const handleScroll = (event) => {
    const target = event.target;

    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      // console.log("reached end", hasNextPageIdentifier.current);
      if (hasNextPageIdentifier.current) {
        fetchCollectData();
      }
    }
  };

  const onVoteButtonClick = () => {
    onTabChange(TabItems[TabNames.VoteImage]);
    Router.push({ pathname: "/" });
  };

  return (
    <div
      className={`${styles.collectNft} ${
        !isUserLoggedIn ? "flex flex-col justify-center items-center" : ""
      } 
      mt-[40px] min-h-0  pl-0 pr-0`}
    >
      {showSignInModal && !isUserLoggedIn ? (
        <CustomSignInModal
          isOpen={showSignInModal}
          onRequestClose={() => setShowSignInModal(false)}
          onSuccess={dispatcherCheck}
        />
      ) : null}

      {showDispatcherModal && !isDispatcherEnabled ? (
        <EnableDispatcherModal onClose={() => setShowDispatcherModal(false)} />
      ) : null}

      {modalShown && isDispatcherEnabled ? (
        <CollectNFTModal
          modalData={modalData}
          shown={modalShown}
          close={() => {
            toggleModal(false);
          }}
        />
      ) : null}
      <div
        className={`${styles.collectnftText} text-[#ffffff] font-bold text-[20px] ml-[15px] lg2:ml-[40px] xl:ml-[40px] leading-[32px] justify-center mb-[15px]`}
      >
        Collect NFTs
      </div>

      {isLoading && !isFirstTimeLoading.current ? (
        <div className="text-center">
          <ClipLoader />
        </div>
      ) : null}

      {!isUserLoggedIn && !isLoading ? (
        <div className="bg-[#00000099] w-[946px] xl:w-[1034px] text-[#ffffff] text-[20px] rounded-[16px]  mt-[16px] h-[512px] flex items-center justify-center xl:ml-[35px] xl:mr-[35px] ml-[15px] mr-[15px]">
          <div className="text-center font-medium text-[16px]">
            <div className="flex items-center mt-[5px]">
              <span className="leading-[26px]">
                <button
                  className={`underline hover:text-[#ADFF00]`}
                  onClick={() => {
                    setShowSignInModal(true);
                  }}
                >
                  Sign in
                </button>
                <span className="ml-[5px]">now to view your</span>
              </span>
              <span className="mx-[5px]">
                <Image
                  src="https://static.plgworks.com/assets/images/non/flame-icon.png"
                  alt="Lens Icon"
                  width="19"
                  height="19"
                />
              </span>
              <span className="leading-[26px]">NFTs </span>
            </div>
          </div>
        </div>
      ) : null}

      {allData.current.length == 0 && !isLoading && isUserLoggedIn ? (
        <div className="flex flex-col items-center">
          <div className="bg-[#00000099] w-[946px] xl:w-[1034px] text-[#ffffff] text-[20px] rounded-[16px] mt-[16px] h-[512px] flex items-center justify-center xl:ml-[35px] xl:mr-[35px] ml-[15px] mr-[15px]">
            <div className="text-center font-medium text-[16px] ">
              <div className="flex items-center">
                <span className="leading-[26px]">Looks like you haven't </span>
                <span className="mx-[5px]">
                  <Image
                    src="https://static.plgworks.com/assets/images/non/flame-icon.png"
                    alt="Lens Icon"
                    width="19"
                    height="19"
                  />
                </span>
                <span className="leading-[26px]">any NFTs yet.. vote your</span>
              </div>
              <div className="leading-[26px]">favourites</div>
              <button
                className={`${collectNFTModalStyles.collectButton} flex  justify-center py-[7px] mt-[20px]`}
                onClick={onVoteButtonClick}
              >
                <span className="pl-[11px]">Vote Now!</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {allData.current.length > 0 && !isLoading && (
        <div
          className={`${styles.scrollContainer} overflow-y-scroll`}
          onScroll={handleScroll}
        >
          <div
            className={`${styles.scroll} grid grid-cols-2 w-fit gap-y-[25px] justify-center max-h-[512px] mt-[16px] m-auto`}
          >
            {allData.current.length > 0 &&
              allData.current.map((ele, index) => {
                return (
                  <Card
                    key={index}
                    cardDetails={ele}
                    showCollectModal={() => {
                      showModal(ele);
                    }}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CollectNFT;
