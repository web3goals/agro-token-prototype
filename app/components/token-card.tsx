"use client";

import { SiteConfigContracts } from "@/config/site";
import { TokenCardHeader } from "./token-card-header";
import { TokenCardRecords } from "./token-card-records";
import { Separator } from "./ui/separator";

export function TokenCard(props: {
  token: string;
  contracts: SiteConfigContracts;
  returnActionVisible?: boolean;
  addRecordActionVisible?: boolean;
}) {
  return (
    <div className="w-full flex flex-col items-center border rounded px-6 py-8">
      <TokenCardHeader
        token={props.token}
        contracts={props.contracts}
        returnActionVisible={props.returnActionVisible}
      />
      <Separator className="my-6" />
      <TokenCardRecords
        token={props.token}
        contracts={props.contracts}
        addRecordActionVisible={props.addRecordActionVisible}
      />
    </div>
  );
}
