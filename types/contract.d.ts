import type { KeyValue } from './general';


export interface DeployParams {
  fee: number | string;
  maxGas: number | string;
  gasPrice: number | string;
  contractDataBase64: string;
  datastore?: KeyValue<string>;
}
