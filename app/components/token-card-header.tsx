"use client";

import { SiteConfigContracts } from "@/config/site";
import { addressToShortAddress } from "@/lib/converters";
import { AgroTokenMetadata } from "@/types/agro-token-metadata";
import { formatEther, isAddressEqual, zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function TokenCardHeader(props: {
  token: string;
  tokenMetadata: AgroTokenMetadata;
  tokenOwner: `0x${string}`;
  tokenInvestmentAmount: string;
  tokenInvestmentTokenSymbol: string;
  tokenInvestor: `0x${string}`;
  tokenReturnDate: string;
  contracts: SiteConfigContracts;
}) {
  const { address } = useAccount();

  const isReturnButtonVisible =
    props.tokenReturnDate === "0" &&
    isAddressEqual(props.tokenOwner, address || zeroAddress);

  return (
    <div className="w-full flex flex-row gap-4">
      {/* Icon */}
      <div>
        <Avatar className="size-14">
          <AvatarImage src="" alt="Icon" />
          <AvatarFallback className="text-2xl bg-primary">
            {props.tokenMetadata?.category === "Cattle" ? "🐂" : "🪙"}
          </AvatarFallback>
        </Avatar>
      </div>
      {/* Content */}
      <div className="w-full flex flex-col gap-4">
        <p className="text-xl font-bold">{props.tokenMetadata?.category}</p>
        <div className="flex flex-col gap-3">
          {/* Description */}
          <div className="flex flex-col gap-1 md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Description:</p>
            <p className="text-sm">{props.tokenMetadata?.description}</p>
          </div>
          {/* Identifier */}
          <div className="flex flex-col gap-1 md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Identifier:</p>
            <p className="text-sm break-all">
              {props.tokenMetadata?.identifier}
            </p>
          </div>
          {/* Created */}
          <div className="flex flex-col gap-1 md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Created:</p>
            <p className="text-sm break-all">
              {new Date(props.tokenMetadata?.created || 0).toLocaleString()}
            </p>
          </div>
          {/* Creator */}
          <div className="flex flex-col gap-1 md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Creator:</p>
            <p className="text-sm break-all">
              <a
                href={`${props.contracts.chain.blockExplorers?.default?.url}/address/${props.tokenOwner}`}
                target="_blank"
                className="underline underline-offset-4"
              >
                {addressToShortAddress(props.tokenOwner)}
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
              {formatEther(BigInt(props.tokenInvestmentAmount || 0))}{" "}
              {props.tokenInvestmentTokenSymbol}
            </p>
          </div>
          {/* Expected return */}
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Expected return:</p>
            <p className="text-sm break-all">
              {formatEther(
                BigInt(props.tokenMetadata?.expectedReturnAmount || 0)
              )}{" "}
              {props.tokenInvestmentTokenSymbol}
            </p>
          </div>
          {/* Expected return period */}
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">
              Expected return period:
            </p>
            <p className="text-sm break-all">
              {props.tokenMetadata?.expectedReturnPeriod === "1m" && "1 month"}
              {props.tokenMetadata?.expectedReturnPeriod === "2m" && "2 months"}
              {props.tokenMetadata?.expectedReturnPeriod === "3m" && "3 months"}
              {props.tokenMetadata?.expectedReturnPeriod === "4m" && "4 months"}
            </p>
          </div>
          {/* Investor */}
          <div className="flex flex-col md:flex-row md:gap-3">
            <p className="text-sm text-muted-foreground">Investor:</p>
            <p className="text-sm break-all">
              {isAddressEqual(props.tokenInvestor, zeroAddress) ? (
                "None"
              ) : (
                <a
                  href={`${props.contracts.chain.blockExplorers?.default?.url}/address/${props.tokenInvestor}`}
                  target="_blank"
                  className="underline underline-offset-4"
                >
                  {addressToShortAddress(props.tokenInvestor)}
                </a>
              )}
            </p>
          </div>
        </div>
        {isReturnButtonVisible && <Button variant="secondary">Return</Button>}
      </div>
    </div>
  );
}
