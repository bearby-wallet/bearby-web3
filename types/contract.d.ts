import type { KeyValue } from './general';


export interface DeployParams {
  maxGas: number | string;
  gasPrice: number | string;
  contractDataBase64: string;
  fee?: number | string;
  datastore?: KeyValue<string>;
}

export interface DatastoreEntryInputParam {
  address: string;
  key: string;
}

export interface DataStoreEntryResponse {
  final_value: number[] |null;
  candidate_value: number[] |null;
}
