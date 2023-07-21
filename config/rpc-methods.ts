export enum JsonRPCRequestMethods {
	GET_STATUS                   = 'get_status',
	GET_ADDRESSES                = 'get_addresses',
	// SEND_OPERATIONS              = 'send_operations',
	GET_GRAPH_INTERVAL           = 'get_graph_interval',
	GET_BLOCKS                   = 'get_blocks',
	GET_ENDORSEMENTS             = 'get_endorsements',
	GET_OPERATIONS               = 'get_operations',
	GET_CLIQUES                  = 'get_cliques',
	GET_STAKERS                  = 'get_stakers',
	GET_FILTERED_SC_OUTPUT_EVENT = 'get_filtered_sc_output_event',
	EXECUTE_READ_ONLY_BYTECODE   = 'execute_read_only_bytecode',
	EXECUTE_READ_ONLY_CALL       = 'execute_read_only_call',
	GET_DATASTORE_ENTRIES        = 'get_datastore_entries'
}
