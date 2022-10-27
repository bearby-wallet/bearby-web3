import { Web3 } from './web3';


function main() {
  if ((globalThis.window as any)['bearby']) {
    return (globalThis.window as any)['bearby'] as Web3;
  }

  return new Web3();
}

export const web3 = main();

export * from './web3';
export * from './contract';
export * from './massa';
export * from './wallet';
