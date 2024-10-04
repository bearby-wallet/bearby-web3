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
  unsafeParameters?: Uint8Array;
}

export interface DatastoreEntryInputParam {
  address: string;
  key: string | Uint8Array;
}

export interface DataStoreEntryResponse {
  final_value: number[] | null;
  candidate_value: number[] | null;
}

export interface CallSmartContractParams {
  fee: number;
  maxGas: number;
  coins: number;
  targetAddress: string;
  functionName: string;
  parameters?: CallParam[];
  unsafeParameters?: Uint8Array;
}

