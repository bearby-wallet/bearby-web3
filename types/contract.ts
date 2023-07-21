import type { CallParam } from "./massa";

export interface DeployParams {
  maxGas: number | string | bigint;
  maxCoins: number | string | bigint;
  coins: number | string | bigint;
  gasPrice: number | string | bigint;
  contractDataBase64: string;
  deployerBase64: string;
  fee?: number | string | bigint;
  parameters?: CallParam[];
}

export interface DatastoreEntryInputParam {
  address: string;
  key: string;
}

export interface DataStoreEntryResponse {
  final_value: number[] |null;
  candidate_value: number[] |null;
}
