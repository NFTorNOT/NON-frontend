import GenerateNFT from "../GenerateNFT";
import NFTOfTheDay from "../../pages/collect";
import VoteImage from "../../pages";

export const TabNames = {
  NftOfTheDay: "NftOfTheDay",
  GenerateImage: "GenerateImage",
  VoteImage: "VoteImage",
};

export const TabItems = {
  [TabNames.VoteImage]: {
    id: "Vote",
    tabName: "Vote",
    Component: () => <VoteImage />,
  },
  [TabNames.GenerateImage]: {
    id: "SubmitYourOwn",
    tabName: "Submit Your Own",
    Component: () => <GenerateNFT />,
  },
  [TabNames.NftOfTheDay]: {
    id: "Collect",
    tabName: "Collect NFT’s",
    Component: () => <NFTOfTheDay />,
  },
};

export const DEFAULT_TAB = TabItems[TabNames.VoteImage];
