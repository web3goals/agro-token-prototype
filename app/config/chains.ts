import { Chain } from "viem/chains";

export const raspberryTestnet: Chain = {
  id: 123420111,
  name: "Raspberry Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.opcelestia-raspberry.gelato.digital"] },
  },
  blockExplorers: {
    default: {
      name: "Raspberry Testnet Explorer",
      url: "https://opcelestia-raspberry.gelatoscout.com/",
    },
  },
  testnet: true,
};
