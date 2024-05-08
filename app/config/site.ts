import { Chain } from "viem/chains";
import { raspberryTestnet } from "./chains";

export type SiteConfig = typeof siteConfig;

export type SiteConfigContracts = {
  chain: Chain;
  agrotoken: `0x${string}`;
  usdtoken: `0x${string}`;
  entryPoint: `0x${string}`;
  paymaster: `0x${string}`;
  accountFactory: `0x${string}`;
  accountAbstractionSuported: boolean;
};

export const siteConfig = {
  emoji: "🌱",
  name: "AgroToken",
  description: "A platform for tokenization and trading of crops and livestock",
  links: {
    github: "https://github.com/web3goals/agro-token-prototype",
  },
  contracts: {
    raspberryTestnet: {
      chain: raspberryTestnet,
      agrotoken: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      usdtoken: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      entryPoint: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      paymaster: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountFactory:
        "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountAbstractionSuported: false,
    } as SiteConfigContracts,
  },
};
