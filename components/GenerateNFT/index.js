import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import Image from "next/image";
import LensHelper from "../../utils/LensHelper";
import styles from "./Generate.module.scss";
import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems, TabNames } from "../Main/TabItems";
import { useUserContext } from "../../context/UserContext";
import PublicationApi from "../../graphql/PublicationApi";
import FilterToText from "./FilterToText";
import ThemesData from "./ThemesData";
import { useAuthContext } from "../../context/AuthContext";
import SubmitForVoteModal from "./SubmitForVoteModal/SubmitForVoteModal";
import UserInput from "./UserInput";
import { axiosInstance } from "../../AxiosInstance";
import EnableDispatcherModal from "../EnableDispatcherModal";
import UserApi from "../../graphql/UserApi";
import ImageLoader from "../NONImage/ImageLoader";
import MagicIcon from "./MagicIcon";
import { useRouter } from "next/router";
import CustomSignInModal from "../CustomSignInModal";
import { toast, Toaster } from "react-hot-toast";

export default function GenerateNFT() {
  const [image, setImage] = useState("");
  const router = useRouter();
  const { address } = useAccount();
  const { userProfile } = useUserContext();
  const { isUserLoggedIn } = useAuthContext();
  const { onTabChange } = useBottomTab();
  var sectionStyle = {
    backgroundImage: `url(${image})`,
  };
  const [prompt, setPromt] = useState(router.query["prompt"] || "");
  const [filter, setfilter] = useState(router.query["filter"] || "CINEMATIC");
  const [theme, setTheme] = useState("");
  const [selectedImageData, setSelectedImageData] = useState();
  const [shouldShowSignInModal, setShouldShowSignInModal] = useState(false);

  const lensMetadataIpfsObjectId = useRef();
  const imageIpfsObjectId = useRef();

  const [imagesData, setImagesData] = useState([]);
  const [submitToVoteModal, setsubmitToVoteModal] = useState(false);
  const [submitToVoteApiInProgress, setSubmitToVoteApiInProgress] =
    useState(false);

  const submittedImagePublicationId = useRef();

  var filterOptions = [];
  const [imageGenerationInProgress, setImageGenerationInProgress] =
    useState(false);
  const [shouldShowEnableDispatcherModal, setShouldShowEnableDispatcherModal] =
    useState(false);
  const userProfileRef = useRef();
  let regex = /[`!@#$%^&*()_+\=\[\]{};':"\\|<>\/?~]/;

  const generatedImagesRef = useRef([]);

  for (var key in FilterToText) {
    filterOptions.push(key);
  }

  const trendingThemes = useRef([]);

  const fetchTheme = async () => {
    try {
      const themeRes = await axiosInstance.get("/active-themes");
      const activeThemes = themeRes?.data?.data?.active_theme_ids;
      const allThemes = themeRes?.data?.data?.themes;
      let themes = [];
      for (let i = 0; i < activeThemes.length; i++) {
        let theme = Object.values(allThemes)?.find(
          (theme) => theme.id == activeThemes[i]
        );
        themes.push(theme);
      }
      trendingThemes.current = [...themes];

      setTheme(router.query["theme"] || trendingThemes.current[0]?.name);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchTheme();
  }, []);

  const submitForGeneration = () => {
    if (!prompt.trim()) {
      toast.error("Prompt is required for image generaration.");
      return;
    }

    if (regex.test(prompt.trim())) {
      toast.error("Prompt can not contain special characters.");
      return;
    }

    setImageGenerationInProgress(true);

    axiosInstance
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/image-suggestions`, {
        params: {
          prompt: prompt.trim(),
          art_style: FilterToText[filter],
        },
      })
      .then((response) => {
        // console.log(response.data);

        const generatedImagesResponseData = response.data.data;
        if (!generatedImagesResponseData) {
          // TODO:DS : Show Response Err
          return;
        }
        const suggestionsIdsArr = generatedImagesResponseData.suggestion_ids;
        const suggestionsMap = generatedImagesResponseData.suggestions;
        let currentGeneratedImages = [];
        for (let cnt = 0; cnt < suggestionsIdsArr.length; cnt++) {
          const image = suggestionsMap[suggestionsIdsArr[cnt]];

          if (!image) {
            continue;
          }

          let data = {
            imageUrl: image.image_url,
            prompt: prompt.trim(),
            theme: theme,
            filter: filter,
          };
          currentGeneratedImages.push(data);
        }

        generatedImagesRef.current = [
          ...currentGeneratedImages,
          ...generatedImagesRef.current,
        ];
        setImagesData(currentGeneratedImages);
      })
      .finally(() => {
        setImageGenerationInProgress(false);
      });
  };

  async function onSubmitToVote(ele) {
    if (!isUserLoggedIn) {
      setShouldShowSignInModal(true);
      return;
    }
    // console.log({ ele });
    setSelectedImageData(ele);
    setsubmitToVoteModal(true);
  }

  const postOnLens = async () => {
    try {
      const { txId, txHash } = await LensHelper.postWithDispatcher({
        postMetadataCid: lensMetadataIpfsObjectId.current.cid,
        profileId: userProfile.lens_profile_id,
        profileAddress: address,
      });

      let indexedResult = await LensHelper.pollUntilIndexed({ txId: txId });

      const publicationRes =
        await PublicationApi.fetchPublicationWithTranscationHash(txHash);

      submittedImagePublicationId.current =
        publicationRes?.data?.publication?.id;

      submitToVoteApi();

      console.log({ indexedResult, publicationRes });
    } catch (error) {
      console.log(error);
      setSubmitToVoteApiInProgress(false);
    }
  };

  const submitToVoteApi = () => {
    axiosInstance
      .post(`/submit-to-vote`, {
        image_url: selectedImageData?.imageUrl,
        title: selectedImageData?.title,
        description:
          selectedImageData?.prompt.trim() + "," + FilterToText[filter],
        theme_name: selectedImageData?.theme,
        image_ipfs_object_id: imageIpfsObjectId.current.id,
        lens_metadata_ipfs_object_id: lensMetadataIpfsObjectId.current.id,
        lens_publication_id: submittedImagePublicationId.current,
        filter: filter,
      })
      .then((response) => {
        onTabChange(TabItems[TabNames.VoteImage]);
      });
    setSubmitToVoteApiInProgress(false);
  };

  const submitVoteClickHandler = async () => {
    if (!isUserLoggedIn) {
      alert("Please sign in to submit the image");
      return;
    }
    const defaultProfileResponse = await UserApi.defaultProfile({
      walletAddress: address,
    });

    const defaultProfile = defaultProfileResponse?.data?.defaultProfile;
    userProfileRef.current = defaultProfile;

    if (!defaultProfile?.dispatcher?.address) {
      setShouldShowEnableDispatcherModal(true);
      return;
    }

    setSubmitToVoteApiInProgress(true);

    axiosInstance
      .post(`/store-on-ipfs`, {
        image_url: selectedImageData?.imageUrl,
        title: selectedImageData?.title,
        description: selectedImageData?.prompt.trim(),
      })
      .then((response) => {
        const apiResponseData = response.data.data;
        const ipfsObjectIds = apiResponseData.ipfs_object_ids;
        const ipfsObjectsMap = apiResponseData.ipfs_objects;

        for (let i = 0; i < ipfsObjectIds.length; i++) {
          const ipfsObject = ipfsObjectsMap[ipfsObjectIds[i]];

          if (ipfsObject.kind === "IMAGE") {
            imageIpfsObjectId.current = ipfsObject;
          }

          if (ipfsObject.kind === "LENS_PUBLICATION_METADATA") {
            lensMetadataIpfsObjectId.current = ipfsObject;
          }
        }
        postOnLens();
      })
      .catch((error) => {
        setSubmitToVoteApiInProgress(false);
      });
  };

  return (
    <>
      <div className={`${styles.generateNFT} container `}>
        {shouldShowSignInModal ? (
          <CustomSignInModal
            isOpen={shouldShowSignInModal}
            onRequestClose={() => setShouldShowSignInModal(false)}
          />
        ) : null}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 4000 }}
        />
        <div className={styles.enter_prompt_container}>
          <>
            <div className={styles.containerHeadText}>Themes</div>
            <div className={styles.generateText}>
              Select a theme that the prompt describes
            </div>
            <select
              value={theme}
              className={styles.dropdown}
              name="Themes"
              id="Themes"
              onChange={(e) => {
                setTheme(e.target.value);
              }}
            >
              {trendingThemes.current.map((ele) => {
                return (
                  <option key={ele?.id} value={ele?.name}>
                    #{ele?.name.charAt(0).toUpperCase()+ele?.name.substr(1)}
                  </option>
                );
              })}
            </select>
            <div className={` ${styles.containerHeadText} mt-[24px] mb-[8px]`}>Enter Prompt</div>
            <textarea
              placeholder="Dramatic sky and buildings painting"
              value={prompt}
              className={styles.prompt_area}
              maxLength={250}
              onChange={(e) => {
                setPromt(e.target.value);
              }}
            ></textarea>
            <div className={`${styles.containerHeadText} mt-[12px]`}>Filter</div>
            <div className={styles.generateText}>
              Explore various stylistic filters you can apply
            </div>
            <select
              className={styles.dropdown}
              value={filter}
              name="filters"
              id="filters"
              onChange={(e) => {
                setfilter(e.target.value);
              }}
            >
              {filterOptions.map((style) => {
                return (
                  <option key={style} value={style}>
                    {style}
                  </option>
                );
              })}
            </select>
          </>

          <div
            className={`${styles.button} mt-auto p-[8px]`}
            onClick={() => {
              submitForGeneration();
            }}
            title="Generate Image"
          >
            <div className="flex flex-row justify-between">
              <span className="not-italic font-bold text-[14px] leading-[22px] text-[#ffffff]">Generate Image</span>
              <div>
                <MagicIcon />
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.secondTab}`}>
          <div className={styles.generatedImagePrompts}>
            <SubmitForVoteModal
              visible={submitToVoteModal}
              submitToVoteApiInProgress={submitToVoteApiInProgress}
              setsubmitToVoteModal={setsubmitToVoteModal}
              clickHandler={() => submitVoteClickHandler()}
            />

            {shouldShowEnableDispatcherModal ? (
              <EnableDispatcherModal
                userProfile={userProfileRef.current}
                onClose={() => setShouldShowEnableDispatcherModal(false)}
              />
            ) : null}

            {generatedImagesRef.current.length <= 0 ? (
              <div className={styles.emptyImageContainer}>
                <div className="text-skin-base font-semibold mb-[5px]">
                  Your Generations
                </div>
                <div className="grid gap-5 overflow-y-auto h-full grid-cols-2">
                  <div className={styles.emptyImageCell}>
                    {imageGenerationInProgress ? (
                      <ImageLoader color={"#fff"} height={15} width={15} />
                    ) : (
                      <Image
                        src="https://static.plgworks.com/assets/images/non/generate-default.png"
                        alt="Lens Icon"
                        width="60"
                        height="60"
                      />
                    )}
                  </div>

                  <div className={styles.emptyImageCell}>
                    {imageGenerationInProgress ? (
                      <ImageLoader color={"#fff"} height={15} width={15} />
                    ) : (
                      <Image
                        src="https://static.plgworks.com/assets/images/non/generate-default.png"
                        alt="Lens Icon"
                        width="60"
                        height="60"
                      />
                    )}
                  </div>

                  <div className={styles.emptyImageCell}>
                    <Image
                      src="https://static.plgworks.com/assets/images/non/generate-default.png"
                      alt="Lens Icon"
                      width="60"
                      height="60"
                    />
                  </div>
                  <div className={styles.emptyImageCell}>
                    <Image
                      src="https://static.plgworks.com/assets/images/non/generate-default.png"
                      alt="Lens Icon"
                      width="60"
                      height="60"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div style={sectionStyle}>
                <div className="text-skin-base font-semibold m-[10px]">
                  Your Generations
                </div>
                <div
                  id="generated-image-id"
                  className="grid gap-5 overflow-y-auto h-full grid-cols-2"
                >
                  {imageGenerationInProgress ? (
                    <div className={styles.emptyImageCell}>
                      <ImageLoader color={"#fff"} height={15} width={15} />
                    </div>
                  ) : null}
                  {imageGenerationInProgress ? (
                    <div className={styles.emptyImageCell}>
                      <ImageLoader color={"#fff"} height={15} width={15} />
                    </div>
                  ) : null}
                  {generatedImagesRef.current.length > 0 &&
                    generatedImagesRef.current.map((ele, index) => (
                      <div className={styles.emptyImageCell}>
                        <div
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
                          />
                        </div>
                      </div>
                      // <div className={`${styles.bottom} relative`} key={index}>
                      //   <div
                      //     style={{
                      //       backgroundImage: `url(${ele.imageUrl})`,
                      //     }}
                      //     className="h-[412px] rounded-[16px]"
                      //   ></div>

                      //   <div className="absolute w-full">
                      //     <UserInput
                      //       key={index}
                      //       image={ele.imageUrl}
                      //       onSubmitToVote={() => onSubmitToVote(ele)}
                      //       style={styles.masterpeice}
                      //       onSubmit={(value) => {
                      //         ele.title = value;
                      //       }}
                      //     />
                      //   </div>
                      // </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
