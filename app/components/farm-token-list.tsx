"use client";

import { SiteConfigContracts, siteConfig } from "@/config/site";
import { agroTokenAbi } from "@/contracts/abi/agroToken";
import { useEffect, useState } from "react";
import { isAddressEqual, zeroAddress } from "viem";
import { useAccount, useInfiniteReadContracts } from "wagmi";
import EntityList from "./entity-list";
import { TokenCard } from "./token-card";

const LIMIT = 42;

export function FarmTokenList() {
  return (
    <div className="w-full flex flex-col gap-6">
      {Object.values(siteConfig.contracts).map((contracts, index) => (
        <FarmTokenListForContracts key={index} contracts={contracts} />
      ))}
    </div>
  );
}

function FarmTokenListForContracts(props: { contracts: SiteConfigContracts }) {
  const { address } = useAccount();
  const [smartAccountAddress, setSmartAccountAddress] = useState<
    `0x${string}` | undefined
  >();
  const [tokens, setTokens] = useState<string[] | undefined>();

  const { data } = useInfiniteReadContracts({
    cacheKey: `farm_token_list_${props.contracts.chain.id.toString()}`,
    contracts(pageParam) {
      return [...new Array(LIMIT)].map(
        (_, i) =>
          ({
            address: props.contracts.agroToken,
            abi: agroTokenAbi,
            functionName: "ownerOf",
            args: [BigInt(pageParam + i)],
            chainId: props.contracts.chain.id,
          } as const)
      );
    },
    query: {
      initialPageParam: 0,
      getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
        return lastPageParam + 1;
      },
    },
  });

  useEffect(() => {
    setSmartAccountAddress(undefined);
    if (address) {
      if (props.contracts.accountAbstractionSuported) {
        // TODO: Implement
      } else {
        setSmartAccountAddress(address);
      }
    }
  }, [address, props.contracts]);

  useEffect(() => {
    setTokens(undefined);
    if (address && data && smartAccountAddress) {
      const tokens: string[] = [];
      const owners = (data as any).pages[0];
      for (let i = 0; i < owners.length; i++) {
        const element = owners[i];
        if (
          isAddressEqual(element.result || zeroAddress, smartAccountAddress)
        ) {
          tokens.push(String(i));
        }
      }
      setTokens(tokens);
    }
  }, [address, data, smartAccountAddress]);

  return (
    <EntityList
      entities={tokens}
      renderEntityCard={(token, index) => (
        <TokenCard
          key={index}
          token={token}
          contracts={props.contracts}
          returnActionVisible={true}
          addRecordActionVisible={true}
        />
      )}
      noEntitiesText={`No tokens on ${props.contracts.chain.name} 😐`}
      className="gap-6"
    />
  );
}
