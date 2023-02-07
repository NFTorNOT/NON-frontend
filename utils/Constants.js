export const Constants = {
  SESSION_STORAGE_ACCESS_TOKEN_KEY: "accessToken",
  SESSION_STORAGE_REFRESH_TOKEN_KEY: "refreshToken",
  SESSION_EXPIRY_TIME_KEY: "sessionExpiryTime",
  //   LENS_APP_ID: "NFT or not",
  LENS_APP_ID: "non-backend",
  // NFT_OF_THE_DAY_CONTRACT_ADDRESS: "0x4E311732CD82C26237cEf8Bb1065CCF90b74b596"
  NFT_OF_THE_DAY_CONTRACT_ADDRESS: "0x0F731a10eF112232986E72FBEb93de050ff23b00",
  MUMBAI_POLYGON_SCAN_TX_ENDPOINT: "https://mumbai.polygonscan.com/tx/",
  WMATIC_CURRENCY_ADDRESS: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
  FEE_COLLECT_MODULE: "FeeCollectModule",
};

export const ReactionTypes = {
  VOTED: "VOTED",
  IGNORED: "IGNORED",
};

export const ERROR_TYPES = {
  ALLOWANCE: "You do not have enough allowance to collect this publication.",
};

export const TRENDING_THEMES = [
  {
    id: 1,
    name: "light",
  },
  {
    id: 2,
    name: "space",
  },
  {
    id: 3,
    name: "magical",
  },
  // {
  //   id: 4,
  //   name: "other",
  // },
];

export const CURRENT_TRENDING_THEMES = [
  {
    id: 1,
    name: "light",
  },
  {
    id: 2,
    name: "space",
  },
  {
    id: 3,
    name: "magical",
  },
];
