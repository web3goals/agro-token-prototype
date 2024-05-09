export const CONTRACTS: {
  [key: string]: {
    agroToken: `0x${string}` | undefined;
    usdToken: `0x${string}` | undefined;
    entryPoint: `0x${string}` | undefined;
    accountFactory: `0x${string}` | undefined;
    paymaster: `0x${string}` | undefined;
  };
} = {
  raspberryTestnet: {
    agroToken: "0x02008a8DBc938bd7930bf370617065B6B0c1221a",
    usdToken: "0x96E6AF6E9e400d0Cd6a4045F122df22BCaAAca59",
    entryPoint: "0x0000000000000000000000000000000000000000",
    accountFactory: "0x0000000000000000000000000000000000000000",
    paymaster: "0x0000000000000000000000000000000000000000",
  },
};
