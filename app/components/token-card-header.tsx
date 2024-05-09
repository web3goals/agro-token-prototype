import { SiteConfigContracts } from "@/config/site";
import { agroTokenAbi } from "@/contracts/abi/agroToken";
import useMetadataLoader from "@/hooks/useMetadataLoader";
import { AgroTokenMetadata } from "@/types/agro-token-metadata";
import { useReadContract } from "wagmi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { erc20Abi, formatEther, isAddressEqual, zeroAddress } from "viem";
import { Skeleton } from "./ui/skeleton";
import { addressToShortAddress } from "@/lib/converters";
import { Button } from "./ui/button";

export function TokenCardHeader(props: {
  token: string;
  contracts: SiteConfigContracts;
  returnActionVisible?: boolean;
}) {
  /**
   * Define token data
   */
  const { data: tokenOwner, isFetched: isTokenOwnerFetched } = useReadContract({
    address: props.contracts.agroToken,
    abi: agroTokenAbi,
    functionName: "ownerOf",
    args: [BigInt(props.token)],
    chainId: props.contracts.chain.id,
  });
  const { data: tokenParams, isFetched: isTokenParamsFetched } =
    useReadContract({
      address: props.contracts.agroToken,
      abi: agroTokenAbi,
      functionName: "getParams",
      args: [BigInt(props.token)],
      chainId: props.contracts.chain.id,
    });
  const { data: tokenMetadataUri, isFetched: isTokenMetadataUriFetched } =
    useReadContract({
      address: props.contracts.agroToken,
      abi: agroTokenAbi,
      functionName: "tokenURI",
      args: [BigInt(props.token)],
      chainId: props.contracts.chain.id,
    });
  const { data: tokenMetadata, isLoaded: isTokenMetadataLoaded } =
    useMetadataLoader<AgroTokenMetadata>(tokenMetadataUri);

  /**
   * Define investment token symbol
   */
  const {
    data: tokenInvestmentTokenSymbol,
    isFetched: isTokenInvestmentTokenSymbol,
  } = useReadContract({
    address: tokenParams?.investmentToken || zeroAddress,
    abi: erc20Abi,
    functionName: "symbol",
  });

  if (
    !isTokenOwnerFetched ||
    !isTokenParamsFetched ||
    !isTokenMetadataUriFetched ||
    !isTokenMetadataLoaded ||
    !isTokenInvestmentTokenSymbol
  ) {
    return <Skeleton className="w-full h-8" />;
  }

  return (
    <div className="w-full flex flex-row gap-4">
      {/* Icon */}
      <div>
        <Avatar className="size-14">
          <AvatarImage src="" alt="Icon" />
          <AvatarFallback className="text-2xl bg-primary">
            {tokenMetadata?.category === "Cattle" ? "🐂" : "🪙"}
          </AvatarFallback>
        </Avatar>
      </div>
      {/* Content */}
      <div className="w-full">
        <p className="text-xl font-bold">{tokenMetadata?.category}</p>
        <div className="flex flex-col gap-3 mt-4">
          {/* Description */}
          <div className="flex flex-col gap-1 md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Description:</p>
            <p className="text-sm">{tokenMetadata?.description}</p>
          </div>
          {/* Identifier */}
          <div className="flex flex-col gap-1 md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Identifier:</p>
            <p className="text-sm break-all">{tokenMetadata?.identifier}</p>
          </div>
          {/* Created */}
          <div className="flex flex-col gap-1 md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Created:</p>
            <p className="text-sm break-all">
              {new Date(tokenMetadata?.created || 0).toLocaleString()}
            </p>
          </div>
          {/* Creator */}
          <div className="flex flex-col gap-1 md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Creator:</p>
            <p className="text-sm break-all">
              <a
                href={`${props.contracts.chain.blockExplorers?.default?.url}/address/${tokenOwner}`}
                target="_blank"
                className="underline underline-offset-4"
              >
                {addressToShortAddress(tokenOwner || zeroAddress)}
              </a>
            </p>
          </div>
          {/* Chain */}
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Chain:</p>
            <p className="text-sm break-all">{props.contracts.chain.name}</p>
          </div>
          {/* Required investment */}
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">
              Required investment:
            </p>
            <p className="text-sm break-all">
              {formatEther(tokenParams?.investmentAmount || BigInt(0))}{" "}
              {tokenInvestmentTokenSymbol}
            </p>
          </div>
          {/* Expected return */}
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Expected return:</p>
            <p className="text-sm break-all">
              {formatEther(BigInt(tokenMetadata?.expectedReturnAmount || 0))}{" "}
              {tokenInvestmentTokenSymbol}
            </p>
          </div>
          {/* Expected return period */}
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">
              Expected return period:
            </p>
            <p className="text-sm break-all">
              {tokenMetadata?.expectedReturnPeriod === "1m" && "1 month"}
              {tokenMetadata?.expectedReturnPeriod === "2m" && "2 months"}
              {tokenMetadata?.expectedReturnPeriod === "3m" && "3 months"}
              {tokenMetadata?.expectedReturnPeriod === "4m" && "4 months"}
            </p>
          </div>
          {/* Investor */}
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Investor:</p>
            <p className="text-sm break-all">
              {isAddressEqual(
                tokenParams?.investor || zeroAddress,
                zeroAddress
              ) ? (
                "None"
              ) : (
                <a
                  href={`${props.contracts.chain.blockExplorers?.default?.url}/address/${tokenParams?.investor}`}
                  target="_blank"
                  className="underline underline-offset-4"
                >
                  {addressToShortAddress(tokenParams?.investor || zeroAddress)}
                </a>
              )}
            </p>
          </div>
        </div>
        {/* TODO: Implement */}
        {/* TODO: Define by token params and connected address */}
        {props.returnActionVisible && (
          <div className="mt-4">
            <Button variant="secondary">Return</Button>
          </div>
        )}
      </div>
    </div>
  );
}
