<div align="center">
  <h1>
  bearby web3 library
  </h1>
  <strong>
    Allows you to interact with the bearby wallet.
  </strong>
</div>
<hr/>

## Introduction

The main web3 module of bearby wallet.

The following table provides a description of each module and what you may
want to use it for.

| Package                                                                         | Version                                                                                                                               | Description                                                                                                                                                               | Dependencies                                                  |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [`@hicaru/bearby.js`](./packages/web3)                                | [![npm](https://img.shields.io/npm/v/@hicaru/bearby.js.svg)](https://img.shields.io/npm/v/@hicaru/bearby.js)                           | Core abstractions and base classes, such as `ContentProvider` and network logic for interfacing with the bearby wallet.                                                   |                                                               |


### Installation

```bash
$ yarn # or npm install
```

run dev mode

```bash
$ yarn dev # or npm run dev
```

building

```bash
$ yarn build # or npm run build
```

## Quick Start

In your project:
```bash
yarn add @hicaru/bearby.js # or npm install @hicaru/bearby.js
```

import (this script works only in the browser!)
```javascript
import { web3 } from '@hicaru/bearby.js';
```

states:

```javascript
import { web3 } from '@hicaru/bearby.js';

web3.contract // the instance for read, call, deploy contracts
web3.massa // JsonRPC methods connection to nodes.
web3.wallet // main statements of the wallet
```

`web3.wallet`:
 * `web3.wallet.connected` the bool type, `false` if user didn't connected to website.
 * `web3.wallet.enabled` the bool type, `false` if wallet locked.
 * `web3.wallet.account` the account object, has methods and properties about current address.
 * `web3.wallet.network` the network object, has methods and properties about current network.
 * `web3.wallet.connect()` the method, after call shows a popup with website information, user can approve or reject.
 * `web3.wallet.signMessage("any message to sign")` the method for sign any messages, shows a popup about message info.
 * `web3.wallet.signTransaction(params)` the method for sending transaction to network.


Account observer:
```javascript
import { web3 } from '@hicaru/bearby.js';

/// Emit everytime when address been changed, or changed wallet status.
const observer = web3.wallet.account.subscribe((base58) => console.log(base58));

/// To avoid memory leak don't forget unsubscribe!!!
observer.unsubscribe();
```

Network observer:
```javascript
import { web3 } from '@hicaru/bearby.js';

/// Emit everytime when network been changed.
const observer = web3.wallet.network.subscribe((net) => console.log(net))

/// To avoid memory leak don't forget unsubscribe!!!
observer.unsubscribe();
```

### Contracts:

deploy
```javascript
import { web3 } from '@hicaru/bearby.js';

const hash = await web3.contract.deploy({
  fee: 0,
  maxGas: 2000000,
  gasPrice: 0,
  contractDataBase64: 'base64'
});
```

call
```javascript
import { web3 } from '@hicaru/bearby.js';

const hash = await web3.contract.call({
  maxGas: 2000000,
  coins: 0,
  targetAddress: 'A12KqAUVvPZAAybdmJijkKbynfJeDUsfztEUh8JCSx6DPjczdYLt',
  functionName: 'transfer',
  parameter: {
    toAccount: 'A12fJb1M9EfAF7YmqYmhBrjb4pEa6hPthTrmwVDePGK9dVmGwknc',
    nbTokens: '0'
  }
});
```

read
```javascript
import { web3 } from '@hicaru/bearby.js';

const data = await web3.contract.readSmartContract({
  fee: 0,
  maxGas: 200000,
  simulatedGasPrice: 0,
  targetAddress: 'A12KqAUVvPZAAybdmJijkKbynfJeDUsfztEUh8JCSx6DPjczdYLt',
  targetFunction: "balanceOf",
  parameter: 'A12fJb1M9EfAF7YmqYmhBrjb4pEa6hPthTrmwVDePGK9dVmGwknc'
});
console.log(data);
```

events
```javascript
import { web3 } from '@hicaru/bearby.js';

const eventsFilter = {
  start: null,
  end: null,
  original_caller_address: null,
  original_operation_id: hash,
  emitter_address: null,
};
const response = await web3.contract.getFilteredSCOutputEvent(eventsFilter);

if (response && response.result && response.result[0] && response.result[0].data) {
  const contract = String(response.result[0].data).replace('Address:', '');
  console.log(contract);
}
```
types
```javascript
import { JsonRPCResponseExecuteReadOnlyBytecode } from '@hicaru/bearby.js/types';

const res?: JsonRPCResponseExecuteReadOnlyBytecode;
```

