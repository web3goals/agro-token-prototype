export type AgroTokenMetadata = {
  created: number | undefined;
  category: "Cattle" | string | undefined;
  description: string | undefined;
  identifier: string | undefined;
  expectedReturnAmount: string | undefined;
  expectedReturnPeriod: string | undefined;
  records: { date: number; value: string }[] | undefined;
};
