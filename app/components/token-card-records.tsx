import { SiteConfigContracts } from "@/config/site";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { agroTokenAbi } from "@/contracts/abi/agroToken";
import useMetadataLoader from "@/hooks/useMetadataLoader";
import { AgroTokenMetadata } from "@/types/agro-token-metadata";
import { useReadContract } from "wagmi";
import { Skeleton } from "./ui/skeleton";
import { TokenAddRecordDialog } from "./token-add-record-dialog";
import EntityList from "./entity-list";
import { erc20Abi, zeroAddress } from "viem";

// TODO: Implement
export function TokenCardRecords(props: {
  token: string;
  contracts: SiteConfigContracts;
  addRecordActionVisible?: boolean;
}) {
  /**
   * Define token data
   */
  const { data: tokenParams, isFetched: isTokenParamsFetched } =
    useReadContract({
      address: props.contracts.agroToken,
      abi: agroTokenAbi,
      functionName: "getParams",
      args: [BigInt(props.token)],
      chainId: props.contracts.chain.id,
    });
  const {
    data: tokenMetadataUri,
    isFetched: isTokenMetadataUriFetched,
    refetch: refetchTokenMetadataUri,
  } = useReadContract({
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
        <Avatar className="size-10">
          <AvatarImage src="" alt="Icon" />
          <AvatarFallback className="text-base bg-secondary">✍️</AvatarFallback>
        </Avatar>
      </div>
      {/* Content */}
      <div className="w-full flex flex-col gap-4">
        <p className="text-lg font-bold">Records</p>
        <EntityList
          entities={tokenMetadata?.records}
          renderEntityCard={(record, index) => (
            <TokenCardRecord
              key={index}
              record={record}
              tokenMetadata={tokenMetadata}
              tokenInvestmentTokenSymbol={tokenInvestmentTokenSymbol}
            />
          )}
          noEntitiesText="No records 😐"
        />
        {/* TODO: Define by token params and connected address */}
        {props.addRecordActionVisible && tokenMetadata && (
          <TokenAddRecordDialog
            token={props.token}
            tokenMetadata={tokenMetadata}
            contracts={props.contracts}
            onAdd={() => refetchTokenMetadataUri()}
          />
        )}
      </div>
    </div>
  );
}

function TokenCardRecord(props: {
  record: { date: number; value: string };
  tokenMetadata?: AgroTokenMetadata;
  tokenInvestmentTokenSymbol?: string;
}) {
  const TOKENS_PER_CATTLE_KG = 7;

  return (
    <div className="flex flex-row gap-2">
      <p className="text-sm text-muted-foreground">
        {new Date(props.record.date).toLocaleString()} —
      </p>
      <p className="text-sm">{props.record.value}</p>
      {props.tokenMetadata?.category === "Cattle" && (
        <p className="text-sm">
          kg (~{Number(props.record.value) * TOKENS_PER_CATTLE_KG}{" "}
          {props.tokenInvestmentTokenSymbol || "tokens"})
        </p>
      )}
    </div>
  );
}
