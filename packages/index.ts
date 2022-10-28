import { Web3 } from './web3';


function main() {
  if (globalThis.window && (globalThis.window as any)['bearby']) {
    return (globalThis.window as any)['bearby'] as Web3;
  }

  return new Web3();
}

export const web3 = main();
