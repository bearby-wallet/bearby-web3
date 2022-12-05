import { JsonRPCRequestMethods } from '../config/rpc-methods';


export type Params = object[] | string[] | number[] | (string | string[] | number[])[];

export interface RPCBody {
  method: JsonRPCRequestMethods;
  params: Params;
}

export interface JsonRPCResponse {
  error?: {
    code: number;
    message: string;
  };
  result?: object;
  id: number;
  jsonrpc: string;
}

export interface JsonRPCResponseNodeStatus extends JsonRPCResponse {
  result?: {
    config: {
      block_reward: string;
      delta_f0: number;
      end_timestamp: number | null;
      genesis_timestamp: number;
      max_block_size: number;
      operation_validity_periods: number;
      periods_per_cycle: number;
      pos_lock_cycles: number;
      pos_lookback_cycles: number;
      roll_price: string;
      t0: number;
      thread_count: number;
    },
    connected_nodes: {
      [key: string]: Array<boolean | string>;
    },
    consensus_stats: {
        clique_count: number;
        end_timespan: number;
        final_block_count: number;
        final_operation_count: number;
        staker_count: number;
        stale_block_count: number;
        start_timespan: number;
    },
    current_cycle: number;
    current_time: number;
    last_slot?: {
        period: number;
        thread: number;
    },
    network_stats: {
        active_node_count: number;
        banned_peer_count: number;
        in_connection_count: number;
        known_peer_count: number;
        out_connection_count: number;
    },
    next_slot: {
        period: number;
        thread: number;
    },
    node_id: string;
    node_ip: string;
    pool_stats: {
        endorsement_count: number;
        operation_count: number;
    },
    version: string;
  };
}

export interface AddressInfo {
  final_parallel_balance: string;
  final_roll_count: number;
  final_sequential_balance: string;
  candidate_parallel_balance: string;
  candidate_roll_count: number;
  candidate_sequential_balance: string;
}

export interface JsonRPCResponseNodeStatusAddresses extends JsonRPCResponse {
  result?: AddressInfo[];
}

export interface JsonRPCResponseStakers extends JsonRPCResponse {
  result?: Array<[string, number]>;
}

export interface OperationTransaction extends JsonRPCResponse {
  result?: {
    id: string; // Operation id
    in_blocks: string[]; // Block ids
    in_pool: boolean;
    is_final: boolean;
    operation: {
      content: {
        expire_period: number;// after that period, the operation become invalid forever
        fee: string; // represent an Amount in coins
        op: {
          Transaction?: {
            amount: string; // represent an Amount in coins
            recipient_address: string
          };
          RollBuy?: {
            roll_count: number;
          };
          RollSell?: {
            roll_count: number;
          };
          ExecuteSC?: {
            data: number[]; // vec of bytes to execute
            max_gas: number; // maximum amount of gas that the execution of the contract is allowed to cost.
            coins: string; // represent an Amount in coins that are spent by consensus and are available in the execution context of the contract.
            gas_price: string; // represent an Amount in coins, price per unit of gas that the caller is willing to pay for the execution.
          };
          CallSC?: {
            target_addr: string; // Address
            target_func: string; // Function name
            param: string; // Parameter to pass to the function
            max_gas: number;
            sequential_coins: number; // Amount
            parallel_coins: number; // Amount
            gas_price: number; // Amount
          };
        };
        sender_public_key: string;
      };
      signature: string;
    }
  }[];
}

export interface MassaBlock extends JsonRPCResponse {
  result?: {
    id: string; // BlockId,
    content?: {
      is_final: boolean;
      is_stale: boolean;
      is_in_blockclique: boolean;
      block: {
        header: {
          content: {
            endorsed_block: string; // Block id
            index: number;
            sender_public_key: string;
            slot: { // endorsed block slot: deifferent from block's slot
              period: number;
              thread: number
            };
          };
          signature: string;
        }
        operation_merkle_root: string; // Hash of all operations
        parents: string[]; // Block ids, as many as thread count
        slot: {
          period: number;
          thread: number;
        };
        signature: string;
      };
      operations: OperationTransaction[];
    };
    is_final: boolean;
    is_in_blockclique: boolean;
    is_stale: boolean;
  }
}

export interface OperationResponse extends JsonRPCResponse {
  result?: string[];
}

export interface JsonRPCResponseEndorsements extends JsonRPCResponse {
  result?: {
    id: string; // EndorsementId,
    in_pool: boolean;
    in_blocks: string[]; // BlockIds,
    is_final: boolean;
    endorsement: {
      content:{
        sender_public_key: string;
        slot: {
            period: number;
            thread: number;
        };
        index: number;
        endorsed_block: string; // BlockId,
      };
      signature: string;
    }
 }[];
}

export interface JsonRPCResponseCliques extends JsonRPCResponse {
  result?: {
    block_ids: string[];
    fitness: number;
    is_blockclique: boolean;
 }[];
}

export interface JsonRPCResponseFilteredSCOutputEvent extends JsonRPCResponse {
  result?: {
    datastring: string; // Arbitrary json string generated by the smart contract
    id: string; // event id 
    context:{
      slot: {
        period: number;
        thread: number;
      },
      block?: string; // block id,
      read_only: boolean; // wether the event was generated during  read only call
      call_stack: string[] //Addresses
      index_in_slot: number;
      origin_operation_id?: string; // operation id
    }
 }[];
}

export interface JsonRPCResponseExecuteReadOnlyBytecode extends JsonRPCResponse {
  result?: {
    executed_at: {
      period: number;
      thread: number;
    },
    result: string; //ok or error message
    output_events: {
      id: string; //id of the event
      context: {
        slot: {
          period: number;
          thread: number;
        },
        block?: string; // block id,
        read_only: boolean; // wether the event was generated during  read only call
        call_stack: string[]; //Addresses
        index_in_slot: number;
        origin_operation_id?: string; // operation id
      };
      data: string; // String of the event you sended
    }[];
 }[];
}

export interface JsonRPCResponseExecuteReadOnlyCall extends JsonRPCResponse {
  result?: {
    executed_at: {
      period: number;
      thread: number;
    },
    result: string; //ok or error message
    output_events: [
      // Each id is a event id. The size of this array is dynamic over the number of events pop in the execution.
      id1: {
        id: string; //id of the event
        context: {
          slot: {
            period: number;
            thread: Number;
          },
          block?: string; // block id,
          read_only: Boolean // wether the event was generated during  read only call
          call_stack: string[], //Addresses
          index_in_slot: number;
          origin_operation_id?: string; // operation id
        }
        data: string; // String of the event you sended
      }
    ]
 }[];
}

export interface EventFilterParam {
  start?: {
    period: number; // will use by default Slot(0,0)
    thread: number; // will use by default Slot(0,0)
  };
  end?: {
    period: number; // will use by default Slot(0,0)
    thread: number; // will use by default Slot(0,0)
  };
  emitter_address?: string; // Address
  original_caller_address?: string; // Address
  original_operation_id?:string; // operation id
}

export interface ExecuteReadOnlyBytecodeParam  {
  max_gas: number;
  simulated_gas_price: number;
  bytecode: number[];
  address?: string;
}

export interface ExecuteReadOnlyCall {
  fee: number;
  maxGas: number;
  simulatedGasPrice: number;
  targetAddress: string;
  targetFunction: string;
  parameter: string;
  callerAddress?: string;
}

export interface CallSmartContractParams {
  fee: number;
  maxGas: number;
  coins: number;
  targetAddress: string;
  functionName: string;
  parameter: object;
  gasPrice?: number;
}
