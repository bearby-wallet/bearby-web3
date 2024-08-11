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
  minimal_fees: string
}

export interface JsonRPCResponseNodeStatusAddresses {
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

export interface JsonRPCResponseStakers {
  result?: Array<[string, number]>;
}

export interface Transaction {
  amount: string;
  recipient_address: string;
}

export type Datastore = Record<string, unknown>

export interface ExecuteSC {
  data: number[];
  max_gas: number;
  datastore: Datastore;
}

export interface CallSC {
  target_addr: string;
  target_func: string;
  param: string;
  max_gas: number;
  coins: number;
}

export interface RollBuy {
  roll_count: number;
}

export interface RollSell {
  roll_count: number;
}

export interface OperationType {
  Transaction?: Transaction;
  ExecutSC?: ExecuteSC;
  CallSC?: CallSC;
  RollBuy?: RollBuy;
  RollSell?: RollSell;
}

export interface Operation {
  fee: string;
  expire_period: number;
  op: OperationType;
}

export interface WrappedOperation {
  content: Operation;
  signature: string;
  content_creator_pub_key?: string;
  content_creator_address?: string;
  id?: string;
}

export interface OperationTransaction {
  result?: {
    id: string; // Operation id
    in_blocks: string[]; // Block ids
    in_pool: boolean;
    is_operation_final: boolean | null;
    thread: number;
    op_exec_status: boolean | null
    operation: WrappedOperation
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

export interface SCEvent {
  data: string;
  context: EventExecutionContext;
}

export interface JsonRPCResponseFilteredSCOutputEvent {
  result?: SCEvent[];
}

export interface EventExecutionContext {
  slot: Slot;
  block?: string;
  read_only: boolean;
  call_stack: string[];
  index_in_slot: number;
  origin_operation_id?: string;
  is_final: boolean;
  is_error?: boolean;
}


export interface StateChanges {
  ledger_changes: Record<string, unknown>;
  async_pool_changes: Record<string, unknown>[];
  pos_changes: Record<string, unknown>;
  executed_ops_changes: Record<string, unknown>;
  executed_denunciations_changes: Record<string, unknown>;
  execution_trail_hash_change: string;
}

export interface JsonRPCResponseExecuteReadOnly {
  result?: {
    executed_at: {
      period: number;
      thread: number;
    },
    gas_cost: number;
    result: {
      Ok?: number[]
      Error?: string
    };
    output_events: SCEvent[],
    state_changes: StateChanges
  }[];
}

export interface EventFilterParam {
  start?: Slot;
  end?: Slot;
  emitter_address?: string; // Address
  original_caller_address?: string; // Address
  original_operation_id?: string; // operation id
  is_final?: boolean;
  is_error?: boolean;
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

