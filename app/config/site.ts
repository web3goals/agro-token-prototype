import { Chain, modeTestnet } from "viem/chains";
import { raspberryTestnet } from "./chains";

export type SiteConfig = typeof siteConfig;

export type SiteConfigContracts = {
  chain: Chain;
  agroToken: `0x${string}`;
  usdToken: `0x${string}`;
  entryPoint: `0x${string}`;
  paymaster: `0x${string}`;
  accountFactory: `0x${string}`;
  accountAbstractionSuported: boolean;
};

export const siteConfig = {
  emoji: "🌱",
  name: "AgroToken",
  description:
    "A platform for tokenization of crops and livestock to attract investments",
  links: {
    github: "https://github.com/web3goals/agro-token-prototype",
  },
  contracts: {
    raspberryTestnet: {
      chain: raspberryTestnet,
      agroToken: "0x02008a8DBc938bd7930bf370617065B6B0c1221a" as `0x${string}`,
      usdToken: "0x96E6AF6E9e400d0Cd6a4045F122df22BCaAAca59" as `0x${string}`,
      entryPoint: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      paymaster: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountFactory:
        "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountAbstractionSuported: false,
    } as SiteConfigContracts,
    modeTestnet: {
      chain: modeTestnet,
      agroToken: "0x4F316c6536Ce3ee94De802a9EfDb20484Ec4BDF9" as `0x${string}`,
      usdToken: "0xC3d9DcfD747795c7F6590B51b44478a0EE7d02F1" as `0x${string}`,
      entryPoint: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      paymaster: "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountFactory:
        "0x0000000000000000000000000000000000000000" as `0x${string}`,
      accountAbstractionSuported: false,
    } as SiteConfigContracts,
  },
};
