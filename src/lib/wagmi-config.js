import { http, createConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || "";

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID || "97");
const activeChain = chainId === 56 ? bsc : bscTestnet;

export const wagmiConfig = createConfig({
  chains: [activeChain],
  connectors: [
    injected(),
    ...(projectId
      ? [
          walletConnect({
            projectId,
            metadata: {
              name: "Wings",
              description: "AI-Powered Travel Intelligence Platform",
              url: "https://wings.app",
              icons: ["/logo.png"],
            },
          }),
        ]
      : []),
  ],
  transports: {
    [bsc.id]: http("https://bsc-dataseed.binance.org"),
    [bscTestnet.id]: http("https://data-seed-prebsc-1-s1.bnbchain.org:8545"),
  },
});

export { activeChain };
