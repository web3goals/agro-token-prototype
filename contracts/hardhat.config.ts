import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    raspberryTestnet: {
      url: "https://rpc.opcelestia-raspberry.gelato.digital",
      accounts: [process.env.PRIVATE_KEY as string],
    },
    modeTestnet: {
      url: "https://sepolia.mode.network",
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
