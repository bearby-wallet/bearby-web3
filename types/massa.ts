import { JsonRPCRequestMethods } from '../config/rpc-methods';
import { ArgTypes, NativeType } from '../config/args-types';


export type Params = object[] | string[] | number[] | (string | string[] | number[])[];

export interface RPCBody {
  method: JsonRPCRequestMethods;
  params: Params;
}

export interface JsonRPCResponse<T> {
  error?: {
    code: number;
    message: string;
  };
  result?: T;
  id: number;
  jsonrpc: string;
}

export interface Slot {
  period: number;
  thread: number;
}

export interface JsonRPCResponseNodeStatus {
  result?: {
    node_id: string;
    node_ip: string;
    version: string;
    current_time: number;
    current_cycle: number;
    current_cycle_time: number;
    next_cycle_time: number;
    connected_nodes: {
      [key: string]: [string, boolean];
    };
    last_slot: {
      period: number;
      thread: number;
    };
    next_slot: {
      period: number;
      thread: number;
    };
    consensus_stats: {
      start_timespan: number;
      end_timespan: number;
      final_block_count: number;
      stale_block_count: number;
      clique_count: number;
    };
    pool_stats: number[];
    network_stats: {
      in_connection_count: number;
      out_connection_count: number;
      known_peer_count: number;
      banned_peer_count: number;
      active_node_count: number;
    };
    execution_stats: {
      time_window_start: number;
      time_window_end: number;
      final_block_count: number;
      final_executed_operations_count: number;
      active_cursor: {
        period: number;
        thread: number;
      };
      final_cursor: {
        period: number;
        thread: number;
      };
    };
    config: {
      genesis_timestamp: number;
      end_timestamp: number | null;
      thread_count: number;
      t0: number;
      delta_f0: number;
      operation_validity_periods: number;
      periods_per_cycle: number;
      block_reward: string;
      roll_price: string;
      max_block_size: number;
    };
    chain_id: number;
  };
}

export interface AddressInfo {
  address: string;
  thread: number;
  final_balance: string;
  final_roll_count: number;
  final_datastore_keys: Array<number[]>;
  candidate_balance: string;
  candidate_roll_count: number;
  candidate_datastore_keys: Array<number[]>;
  cycle_infos: Array<{
    cycle: number;
    is_final: boolean;
    ok_count: number;
    nok_count: number;
    active_rolls: number | null;
  }>;
}

export interface JsonRPCResponseNodeStatusAddresses {
  result?: AddressInfo[];
}

export interface JsonRPCResponseStakers {
  result?: Array<[string, number]>;
}

export interface OperationTransaction {
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
            param: string; // parameters to pass to the function
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

export interface GraphIntervalResponse {
  result?: {
    creator: string;
    id: string;
    is_final: boolean;
    is_in_blockclique: boolean;
    is_stale: boolean;
    parents: string[];
    slot: Slot;
  }[];
}

export interface MassaBlock {
  result?: {
    id: string; // BlockId,
    content?: {
      is_candidate: boolean;
      is_discarded: boolean;
      is_final: boolean;
      is_in_blockclique: boolean;
      block: {
        header: {
          content: {
            endorsements: {
              content: {
                endorsed_block: string;
                index: number;
                slot: Slot;
              };
              creator_address: string;
              creator_public_key: string;
              id: string;
              signature: string;
            };
            operation_merkle_root: string;
            parents: string[];
            slot: Slot;
          };
          creator_address: string;
          creator_public_key: string;
          id: string;
          signature: string;
        };
        operations: string[];
      };
    };
  }
}

export interface OperationResponse {
  result?: string[];
}

export interface JsonRPCResponseEndorsements {
  result?: {
    id: string; // EndorsementId,
    in_pool: boolean;
    in_blocks: string[]; // BlockIds,
    is_final: boolean;
    endorsement: {
      content: {
        sender_public_key: string;
        slot: Slot;
        index: number;
        endorsed_block: string; // BlockId,
      };
      signature: string;
    }
  }[];
}

export interface JsonRPCResponseCliques {
  result?: {
    block_ids: string[];
    fitness: number;
    is_blockclique: boolean;
  }[];
}

export interface JsonRPCResponseFilteredSCOutputEvent {
  result?: {
    datastring: string; // Arbitrary json string generated by the smart contract
    id: string; // event id 
    context: {
      slot: Slot;
      block?: string; // block id,
      read_only: boolean; // wether the event was generated during  read only call
      call_stack: string[] //Addresses
      index_in_slot: number;
      origin_operation_id?: string; // operation id
    }
  }[];
}

export interface JsonRPCResponseExecuteReadOnlyBytecode {
  result?: {
    executed_at: {
      period: number;
      thread: number;
    },
    result: string; //ok or error message
    output_events: {
      id: string; //id of the event
      context: {
        slot: Slot;
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

export interface JsonRPCResponseExecuteReadOnlyCall {
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
          slot: Slot;
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
  start?: Slot;
  end?: Slot;
  emitter_address?: string; // Address
  original_caller_address?: string; // Address
  original_operation_id?: string; // operation id
}

export interface ExecuteReadOnlyBytecodeParam {
  max_gas: number;
  simulated_gas_price: number;
  bytecode: number[];
  address?: string;
}

export interface ExecuteReadOnlyCall {
  fee?: number;
  maxGas?: number;
  coins?: number;
  targetAddress: string;
  targetFunction: string;
  parameter: CallParam[];
  callerAddress?: string;
}

export interface CallParam {
  type: ArgTypes;
  vname?: string;
  value: NativeType | NativeType[] | Uint8Array;
}

