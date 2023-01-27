import "../styles/globals.scss";
import Layout from "../components/Layout";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { AuthProvider } from "../context/AuthContext";
import { BottomTabProvider } from "../context/BottomTabContext";
import { UserProvider } from "../context/UserContext";
import { CollectedNFTModalProvider } from "../context/CollectedNFTModalContext";
import {
  injectedWallet,
  metaMaskWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";

function App({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [polygonMumbai],
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
      publicProvider(),
    ]
  );

  // const { connectors } = getDefaultWallets({
  //   appName: "NFT or Not",
  //   chains,
  // });

  const connectors = connectorsForWallets([
    {
      groupName: "NFT or Not",
      wallets: [
        // injectedWallet({ chains }),
        metaMaskWallet({ chains }),
        coinbaseWallet({ chains }),
        // rainbowWallet({ chains }),
        // walletConnectWallet({ chains }),
      ],
    },
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <AuthProvider>
          <UserProvider>
            <BottomTabProvider>
              <CollectedNFTModalProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </CollectedNFTModalProvider>
            </BottomTabProvider>
          </UserProvider>
        </AuthProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
