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
import Head from "next/head";

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
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=1"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/non-64x64.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/non-57x57.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/non-60x60.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/non-72x72.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/non-76x76.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/non-114x114.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/non-120x120.png`}
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/non-32x32.png`}
        />

        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/non-16x16.png`}
        />
        <link
          rel="shortcut icon"
          type="image/png"
          sizes="48x48"
          href={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/favicons/non-48x48.png`}
        />
      </Head>
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
    </>
  );
}

export default App;
