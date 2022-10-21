import type { KeyValue } from './general';


export interface DeployParams {
  maxGas: number | string;
  gasPrice: number | string;
  contractDataBase64: string;
  fee?: number | string;
  datastore?: KeyValue<string>;
}
