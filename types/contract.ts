import type { CallParam } from "./massa";

export interface DeployParams {
  maxGas: number | string;
  maxCoins: number | string;
  gasPrice: number | string;
  contractDataBase64: string;
  fee?: number | string;
  parameter?: CallParam[];
  datastore?: Map<Uint8Array, Uint8Array>;
}

export interface DatastoreEntryInputParam {
  address: string;
  key: string;
}

export interface DataStoreEntryResponse {
  final_value: number[] |null;
  candidate_value: number[] |null;
}
