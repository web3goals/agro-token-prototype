"use client";

import { SiteConfigContracts } from "@/config/site";
import { agroTokenAbi } from "@/contracts/abi/agroToken";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import EntityList from "./entity-list";
import { TokenCard } from "./token-card";

export function TokenExploreList(props: { contracts: SiteConfigContracts }) {
  const [tokens, setTokens] = useState<string[] | undefined>();

  const { data: nextTokenId } = useReadContract({
    address: props.contracts.agroToken,
    abi: agroTokenAbi,
    functionName: "getNextTokenId",
    chainId: props.contracts.chain.id,
  });

  useEffect(() => {
    if (nextTokenId) {
      const tokens = Array.from({ length: Number(nextTokenId) }, (_, i) =>
        i.toString()
      );
      setTokens(tokens);
    }
  }, [nextTokenId]);

  return (
    <EntityList
      entities={tokens}
      renderEntityCard={(token, index) => (
        <TokenCard key={index} token={token} contracts={props.contracts} />
      )}
      noEntitiesText={`No tokens on ${props.contracts.chain.name} 😐`}
      className="gap-6"
    />
  );
}
