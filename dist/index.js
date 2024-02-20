(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.web3 = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    const FAVICON_REQUIRED = 'website favicon is required';
    const WALLET_IS_NOT_CONNECTED = 'Wallet is not connected';
    const INVALID_SIGN_PARAMS = 'Invalid sign params';
    const TIME_OUT = 'Request failed by timeout';
    const NOT_INSTALLED = 'Bearby is not installed!';
    const AVAILABLE_ONLY_BROWSER = 'bearby-web3 available only browser';
    const WEB3_INSTANCE_CREATED = 'bearby Web3 instance already created!';
    const CALLBACK_ERROR = 'Missing callback arg. use subscribe(cb => /do something/)';

    const TypeOf = Object.freeze({
        isArray(argument) {
            return Object.prototype.toString.call(argument) === '[object Array]';
        },
        isObject(argument) {
            return Object.prototype.toString.call(argument) === '[object Object]';
        },
        isNumber(argument) {
            return Object.prototype.toString.call(argument) === '[object Number]'
                && !isNaN(Number(argument));
        },
        isInt(argument) {
            try {
                return Boolean(BigInt(String(argument)));
            }
            catch {
                return false;
            }
        },
        isError(argument) {
            return Object.prototype.toString.call(argument) === '[object Error]';
        },
        isString(argument) {
            return Object.prototype.toString.call(argument) === '[object String]';
        },
        isBoolean(argument) {
            return Object.prototype.toString.call(argument) === '[object Boolean]';
        },
        isNull(argument) {
            return Object.prototype.toString.call(argument) === '[object Null]';
        },
        isUndefined(argument) {
            return Object.prototype.toString.call(argument) === '[object Undefined]';
        },
        isBigInt(argument) {
            return Object.prototype.toString.call(argument) === '[object BigInt]';
        },
        isEmptyObject(argument) {
            if (!this.isObject(argument)) {
                return false;
            }
            else {
                return Object.getOwnPropertyNames(argument).length === 0;
            }
        },
        isEmptyArray(argument) {
            if (!this.isArray(argument)) {
                return false;
            }
            else {
                return argument.length === 0;
            }
        },
        getType(argument) {
            if (Number.isNaN(argument)) {
                return 'NaN';
            }
            return Object.prototype.toString.call(argument).split(' ')[1].slice(0, -1).toLowerCase();
        }
    });

    var _Transaction_instances, _Transaction_uint8ArrayToHex;
    class Transaction {
        get payload() {
            return JSON.parse(JSON.stringify({
                type: this.type,
                amount: this.amount,
                fee: this.fee,
                gasPrice: this.gasPrice,
                gasLimit: this.gasLimit,
                coins: this.coins,
                maxCoins: this.maxCoins,
                code: this.contract,
                func: this.functionName,
                params: this.parameters,
                unsafeParams: this.unsafeParams ? __classPrivateFieldGet(this, _Transaction_instances, "m", _Transaction_uint8ArrayToHex).call(this, this.unsafeParams) : undefined,
                toAddr: this.recipient || this.contract,
                deployer: this.deployer
            }));
        }
        constructor(type, amount, recipient, parameters, unsafeParams, contract, functionName) {
            _Transaction_instances.add(this);
            this.type = type;
            this.amount = String(amount);
            this.recipient = recipient;
            this.contract = contract;
            this.functionName = functionName;
            this.parameters = parameters;
            this.unsafeParams = unsafeParams;
            if (this.parameters) {
                // serialize bgin params.
                this.parameters = this.parameters.map((data) => {
                    if (TypeOf.isBigInt(data.value)) {
                        data.value = String(data.value);
                    }
                    return data;
                });
            }
        }
    }
    _Transaction_instances = new WeakSet(), _Transaction_uint8ArrayToHex = function _Transaction_uint8ArrayToHex(bytes) {
        return Array.from(bytes)
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
    };

    var OperationsType;
    (function (OperationsType) {
        OperationsType[OperationsType["Payment"] = 0] = "Payment";
        OperationsType[OperationsType["RollBuy"] = 1] = "RollBuy";
        OperationsType[OperationsType["RollSell"] = 2] = "RollSell";
        OperationsType[OperationsType["ExecuteSC"] = 3] = "ExecuteSC";
        OperationsType[OperationsType["CallSC"] = 4] = "CallSC";
    })(OperationsType || (OperationsType = {}));

    var JsonRPCRequestMethods;
    (function (JsonRPCRequestMethods) {
        JsonRPCRequestMethods["GET_STATUS"] = "get_status";
        JsonRPCRequestMethods["GET_ADDRESSES"] = "get_addresses";
        // SEND_OPERATIONS              = 'send_operations',
        JsonRPCRequestMethods["GET_GRAPH_INTERVAL"] = "get_graph_interval";
        JsonRPCRequestMethods["GET_BLOCKS"] = "get_blocks";
        JsonRPCRequestMethods["GET_ENDORSEMENTS"] = "get_endorsements";
        JsonRPCRequestMethods["GET_OPERATIONS"] = "get_operations";
        JsonRPCRequestMethods["GET_CLIQUES"] = "get_cliques";
        JsonRPCRequestMethods["GET_STAKERS"] = "get_stakers";
        JsonRPCRequestMethods["GET_FILTERED_SC_OUTPUT_EVENT"] = "get_filtered_sc_output_event";
        JsonRPCRequestMethods["EXECUTE_READ_ONLY_BYTECODE"] = "execute_read_only_bytecode";
        JsonRPCRequestMethods["EXECUTE_READ_ONLY_CALL"] = "execute_read_only_call";
        JsonRPCRequestMethods["GET_DATASTORE_ENTRIES"] = "get_datastore_entries";
    })(JsonRPCRequestMethods || (JsonRPCRequestMethods = {}));

    function utf8ToBytes(str) {
        let binaryArray = new Uint8Array(str.length);
        Array.prototype.forEach.call(binaryArray, (_, idx, arr) => {
            arr[idx] = str.charCodeAt(idx);
        });
        return binaryArray;
    }

    exports.ArgTypes = void 0;
    (function (ArgTypes) {
        ArgTypes[ArgTypes["STRING"] = 0] = "STRING";
        ArgTypes[ArgTypes["BOOL"] = 1] = "BOOL";
        ArgTypes[ArgTypes["U8"] = 2] = "U8";
        ArgTypes[ArgTypes["U32"] = 3] = "U32";
        ArgTypes[ArgTypes["U64"] = 4] = "U64";
        ArgTypes[ArgTypes["U128"] = 5] = "U128";
        ArgTypes[ArgTypes["U256"] = 6] = "U256";
        ArgTypes[ArgTypes["I32"] = 7] = "I32";
        ArgTypes[ArgTypes["I64"] = 8] = "I64";
        ArgTypes[ArgTypes["F32"] = 9] = "F32";
        ArgTypes[ArgTypes["F64"] = 10] = "F64";
        ArgTypes[ArgTypes["ARRAY"] = 11] = "ARRAY";
        ArgTypes[ArgTypes["UINT8ARRAY"] = 12] = "UINT8ARRAY";
    })(exports.ArgTypes || (exports.ArgTypes = {}));

    var _Contract_provider, _Contract_wallet;
    class Contract {
        constructor(provider, wallet) {
            _Contract_provider.set(this, void 0);
            _Contract_wallet.set(this, void 0);
            this.types = exports.ArgTypes;
            __classPrivateFieldSet(this, _Contract_provider, provider, "f");
            __classPrivateFieldSet(this, _Contract_wallet, wallet, "f");
        }
        async deploy(params) {
            const transaction = new Transaction(OperationsType.ExecuteSC, '0', undefined, params.parameters, params.unsafeParameters, params.contractDataBase64, undefined);
            transaction.deployer = params.deployerBase64;
            transaction.fee = String(params.fee);
            transaction.gasLimit = String(params.maxGas);
            transaction.gasPrice = params.gasPrice ? String(params.gasPrice) : undefined;
            transaction.maxCoins = String(params.maxCoins);
            transaction.coins = String(params.coins);
            return __classPrivateFieldGet(this, _Contract_wallet, "f").signTransaction(transaction);
        }
        async call(params) {
            const transaction = new Transaction(OperationsType.CallSC, '0', undefined, params.parameters, params.unsafeParameters, params.targetAddress, params.functionName);
            transaction.fee = String(params.fee);
            transaction.gasLimit = String(params.maxGas);
            transaction.coins = String(params.coins || 0);
            return __classPrivateFieldGet(this, _Contract_wallet, "f").signTransaction(transaction);
        }
        async getFilteredSCOutputEvent(...filters) {
            const method = JsonRPCRequestMethods.GET_FILTERED_SC_OUTPUT_EVENT;
            const responses = await __classPrivateFieldGet(this, _Contract_provider, "f").send(filters.map((filter) => ({
                method,
                params: [filter]
            })));
            if (filters.length === 1) {
                return responses[0];
            }
            return responses;
        }
        async getDatastoreEntries(...params) {
            const method = JsonRPCRequestMethods.GET_DATASTORE_ENTRIES;
            const data = [];
            for (const { key, address } of params) {
                data.push({
                    address,
                    key: Array.from(utf8ToBytes(key))
                });
            }
            return await __classPrivateFieldGet(this, _Contract_provider, "f").send([{
                    method,
                    params: [data]
                }]);
        }
        async executeReadOlyBytecode(params) {
            const method = JsonRPCRequestMethods.EXECUTE_READ_ONLY_BYTECODE;
            return __classPrivateFieldGet(this, _Contract_provider, "f").send([{
                    method,
                    params: [params]
                }]);
        }
        async readSmartContract(...params) {
            const method = JsonRPCRequestMethods.EXECUTE_READ_ONLY_CALL;
            const responses = await __classPrivateFieldGet(this, _Contract_provider, "f").send([{
                    method,
                    params: [params.map((v) => ({
                            max_gas: v.maxGas,
                            target_address: v.targetAddress,
                            target_function: v.targetFunction,
                            parameter: v.parameter,
                            caller_address: v.callerAddress || __classPrivateFieldGet(this, _Contract_wallet, "f").account.base58
                        }))]
                }]);
            return responses;
        }
    }
    _Contract_provider = new WeakMap(), _Contract_wallet = new WeakMap();

    // This string need that sould did't have problem with conflicts.
    const app = 'BearBy';
    const MTypeTabContent = {
        CONTENT: `@/${app}/content-script`,
        INJECTED: `@/${app}/injected-script`
    };
    const MTypeTab = {
        GET_DATA: `@/${app}/get-wallet-data`,
        NEW_SLOT: `@/${app}/new-slot-emited`,
        ACCOUNT_CHANGED: `@/${app}/accounts-just-changed`,
        CONTENT_PROXY_MEHTOD: `@/${app}/proxy-method`,
        CONTENT_PROXY_RESULT: `@/${app}/response-from-content`,
        CONNECT_APP: `@/${app}/connect-app`,
        RESPONSE_CONNECT_APP: `@/${app}/respoonse-connect-app`,
        NETWORK_CHANGED: `@/${app}/network-just-changed`,
        DISCONNECT_APP: `@/${app}/disconnect_app`,
        DISCONNECT_APP_RESULT: `@/${app}/disconnect_app_result`,
        LOCKED: `@/${app}/guard-just-lock`,
        TX_TO_SEND: `@/${app}/add-tx-to-send`,
        TX_TO_SEND_RESULT: `@/${app}/response-tx-result`,
        CHECK_MASSA_ADDRESS: `@/${app}/check-massa-address`,
        CHECK_MASSA_ADDRESS_RES: `@/${app}/check-massa-address-response`,
        SIGN_MESSAGE: `@/${app}/sign-message-call`,
        SING_MESSAGE_RESULT: `@/${app}/sign-message-response`,
        RESPONSE_PUB_KEY: `@/${app}/response-pub-key`,
        REQUEST_PUB_KEY: `@/${app}/request-pub-key`,
        REQUEST_PING: `@/${app}/req-content-ping`,
        PING_RESPONSE: `@/${app}/res-content-ping`,
    };

    var _TabStream_instances, _TabStream_eventName, _TabStream_dispatch, _TabStream_getEventInit, _TabStream_getEvent;
    const { document } = globalThis;
    /**
     * Used for communication between a web page and an extension's content script.
     */
    class TabStream {
        /**
         * Creates a new TabStream.
         * @param {String} eventName - Event type.
         */
        constructor(eventName) {
            _TabStream_instances.add(this);
            _TabStream_eventName.set(this, void 0);
            __classPrivateFieldSet(this, _TabStream_eventName, eventName, "f");
        }
        /**
         * Message listener that returns decrypted messages when synced
         */
        listen(cb) {
            document.addEventListener(__classPrivateFieldGet(this, _TabStream_eventName, "f"), (event) => {
                if (event && event.detail) {
                    cb(JSON.parse(event.detail));
                }
            });
        }
        /**
         * Message sender which encrypts messages and adds the sender.
         * @param data - The payload to send.
         * @param to - The stream to send messages to.
         */
        send(data, to) {
            data.from = __classPrivateFieldGet(this, _TabStream_eventName, "f");
            if (Object.values(MTypeTabContent).includes(to)) {
                __classPrivateFieldGet(this, _TabStream_instances, "m", _TabStream_dispatch).call(this, JSON.stringify(data), to);
            }
        }
    }
    _TabStream_eventName = new WeakMap(), _TabStream_instances = new WeakSet(), _TabStream_dispatch = function _TabStream_dispatch(data, to) {
        document.dispatchEvent(__classPrivateFieldGet(this, _TabStream_instances, "m", _TabStream_getEvent).call(this, data, to));
    }, _TabStream_getEventInit = function _TabStream_getEventInit(detail) {
        return {
            detail
        };
    }, _TabStream_getEvent = function _TabStream_getEvent(detail, to) {
        return new CustomEvent(to, __classPrivateFieldGet(this, _TabStream_instances, "m", _TabStream_getEventInit).call(this, detail));
    };

    var _Subject_events;
    class Subject {
        constructor() {
            _Subject_events.set(this, []);
        }
        on(listener) {
            __classPrivateFieldGet(this, _Subject_events, "f").push(listener);
            return () => this.removeListener(listener);
        }
        removeListener(listener) {
            const idx = __classPrivateFieldGet(this, _Subject_events, "f").indexOf(listener);
            if (idx > -1)
                __classPrivateFieldGet(this, _Subject_events, "f").splice(idx, 1);
        }
        removeAllListeners() {
            __classPrivateFieldGet(this, _Subject_events, "f").splice(0, __classPrivateFieldGet(this, _Subject_events, "f").length);
        }
        emit(...args) {
            __classPrivateFieldGet(this, _Subject_events, "f").forEach(listener => listener.apply(this, args));
        }
        once(listener) {
            const remove = this.on((...args) => {
                remove();
                listener.apply(this, args);
            });
        }
    }
    _Subject_events = new WeakMap();

    var _ContentMessage_body;
    class ContentMessage {
        get type() {
            return __classPrivateFieldGet(this, _ContentMessage_body, "f").type;
        }
        get payload() {
            return __classPrivateFieldGet(this, _ContentMessage_body, "f").payload;
        }
        constructor(msg) {
            _ContentMessage_body.set(this, void 0);
            __classPrivateFieldSet(this, _ContentMessage_body, msg, "f");
        }
        /**
         * Method for send message.
         */
        send(stream, recipient) {
            const seralized = JSON.stringify(__classPrivateFieldGet(this, _ContentMessage_body, "f"));
            const deserialized = JSON.parse(seralized);
            stream.send(deserialized, recipient);
        }
    }
    _ContentMessage_body = new WeakMap();

    class Handler {
        constructor() {
            this.stream = new TabStream(MTypeTabContent.INJECTED);
            this.subject = new Subject();
            if (globalThis.document) {
                // only not ssr
                this.stream.listen((msg) => {
                    this.subject.emit(msg);
                });
            }
        }
        initialized() {
            const type = MTypeTab.GET_DATA;
            const recipient = MTypeTabContent.CONTENT;
            new ContentMessage({
                type,
                payload: {}
            }).send(this.stream, recipient);
        }
    }

    function uuidv4() {
        const size = 20;
        return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    const TIME_OUT_SECONDS = 5000;

    var _ContentProvider_stream, _ContentProvider_subject;
    class ContentProvider {
        constructor(stream, subject) {
            _ContentProvider_stream.set(this, void 0);
            _ContentProvider_subject.set(this, void 0);
            __classPrivateFieldSet(this, _ContentProvider_stream, stream, "f");
            __classPrivateFieldSet(this, _ContentProvider_subject, subject, "f");
        }
        async send(body) {
            const type = MTypeTab.CONTENT_PROXY_MEHTOD;
            const recipient = MTypeTabContent.CONTENT;
            const uuid = uuidv4();
            let sub;
            new ContentMessage({
                type,
                payload: {
                    body,
                    uuid
                }
            }).send(__classPrivateFieldGet(this, _ContentProvider_stream, "f"), recipient);
            const fulfilled = new Promise((resolve, reject) => {
                sub = __classPrivateFieldGet(this, _ContentProvider_subject, "f").on((msg) => {
                    if (msg.type !== MTypeTab.CONTENT_PROXY_RESULT)
                        return;
                    if (!msg.payload || !msg.payload.uuid)
                        return;
                    if (msg.payload.uuid !== uuid)
                        return;
                    if (msg.payload && msg.payload.reject) {
                        sub();
                        return reject(new Error(msg.payload.reject));
                    }
                    delete msg.payload.uuid;
                    sub();
                    return resolve(msg.payload.resolve);
                });
            });
            const timeout = new Promise((_, reject) => {
                setTimeout(() => {
                    if (sub)
                        sub();
                    reject(new Error(TIME_OUT));
                }, TIME_OUT_SECONDS);
            });
            return Promise.race([fulfilled, timeout]);
        }
    }
    _ContentProvider_stream = new WeakMap(), _ContentProvider_subject = new WeakMap();

    var _Massa_provider, _Massa_wallet;
    class Massa {
        constructor(provider, wallet) {
            _Massa_provider.set(this, void 0);
            _Massa_wallet.set(this, void 0);
            __classPrivateFieldSet(this, _Massa_provider, provider, "f");
            __classPrivateFieldSet(this, _Massa_wallet, wallet, "f");
        }
        async getNodesStatus() {
            const method = JsonRPCRequestMethods.GET_STATUS;
            const [res] = await __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                    method,
                    params: []
                }]);
            return res;
        }
        async getAddresses(...addresses) {
            const method = JsonRPCRequestMethods.GET_ADDRESSES;
            const [res] = await __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                    method,
                    params: [addresses]
                }]);
            return res;
        }
        async getBlocks(...blocks) {
            const method = JsonRPCRequestMethods.GET_BLOCKS;
            const [res] = await __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                    method,
                    params: [blocks]
                }]);
            return res;
        }
        async getGraphInterval(start, end) {
            const method = JsonRPCRequestMethods.GET_GRAPH_INTERVAL;
            const [res] = await __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                    method,
                    params: [{
                            start,
                            end
                        }]
                }]);
            return res;
        }
        async getOperations(...operations) {
            const method = JsonRPCRequestMethods.GET_OPERATIONS;
            const [res] = await __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                    method,
                    params: [operations]
                }]);
            return res;
        }
        async getStakers() {
            const method = JsonRPCRequestMethods.GET_STAKERS;
            const [res] = await __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                    method,
                    params: []
                }]);
            return res;
        }
        async getEndorsements(...Ids) {
            const method = JsonRPCRequestMethods.GET_ENDORSEMENTS;
            const [res] = await __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                    method,
                    params: [Ids]
                }]);
            return res;
        }
        async getCliques() {
            const method = JsonRPCRequestMethods.GET_CLIQUES;
            const [res] = await __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                    method,
                    params: []
                }]);
            return res;
        }
        async payment(amount, recipient) {
            const transaction = new Transaction(OperationsType.Payment, amount, recipient);
            return __classPrivateFieldGet(this, _Massa_wallet, "f").signTransaction(transaction);
        }
        async buyRolls(amount = '1') {
            const transaction = new Transaction(OperationsType.RollBuy, amount);
            return __classPrivateFieldGet(this, _Massa_wallet, "f").signTransaction(transaction);
        }
        async sellRolls(amount = '1') {
            const transaction = new Transaction(OperationsType.RollSell, amount);
            return __classPrivateFieldGet(this, _Massa_wallet, "f").signTransaction(transaction);
        }
    }
    _Massa_provider = new WeakMap(), _Massa_wallet = new WeakMap();

    function assert(expressions, msg) {
        if (!expressions) {
            throw new Error(msg);
        }
    }

    function getFavicon() {
        let ref = globalThis.document.querySelector('link[rel*=\'icon\']');
        if (!ref) {
            throw new Error(FAVICON_REQUIRED);
        }
        return ref.href;
    }

    var _Account_subject;
    class Account {
        constructor(subject) {
            _Account_subject.set(this, void 0);
            __classPrivateFieldSet(this, _Account_subject, subject, "f");
            this.accounts = [];
        }
        subscribe(cb) {
            if (!cb) {
                throw new Error(CALLBACK_ERROR);
            }
            if (this.base58) {
                cb(this.base58);
            }
            const obs = __classPrivateFieldGet(this, _Account_subject, "f").on((msg) => {
                switch (msg.type) {
                    case MTypeTab.DISCONNECT_APP_RESULT:
                        this.base58 = undefined;
                        break;
                    case MTypeTab.ACCOUNT_CHANGED:
                        this.base58 = msg.payload.base58;
                        break;
                    case MTypeTab.RESPONSE_CONNECT_APP:
                        this.base58 = msg.payload.base58;
                        break;
                    case MTypeTab.GET_DATA:
                        this.base58 = msg.payload.base58;
                        break;
                    default:
                        return;
                }
                cb(this.base58);
            });
            return {
                unsubscribe: () => obs()
            };
        }
    }
    _Account_subject = new WeakMap();

    var _Network_subject;
    class Network {
        constructor(subject) {
            _Network_subject.set(this, void 0);
            __classPrivateFieldSet(this, _Network_subject, subject, "f");
        }
        subscribe(cb) {
            cb(this.net);
            const obs = __classPrivateFieldGet(this, _Network_subject, "f").on((msg) => {
                switch (msg.type) {
                    case MTypeTab.RESPONSE_CONNECT_APP:
                        this.net = msg.payload.net;
                        break;
                    case MTypeTab.GET_DATA:
                        this.net = msg.payload.net;
                        break;
                    case MTypeTab.NETWORK_CHANGED:
                        this.net = msg.payload.net;
                        break;
                    default:
                        return;
                }
                cb(this.net);
            });
            return {
                unsubscribe: () => obs()
            };
        }
    }
    _Network_subject = new WeakMap();

    var _Blockchain_subject;
    class Blockchain {
        constructor(subject) {
            _Blockchain_subject.set(this, void 0);
            this.period = -1;
            __classPrivateFieldSet(this, _Blockchain_subject, subject, "f");
        }
        subscribe(cb) {
            const obs = __classPrivateFieldGet(this, _Blockchain_subject, "f").on((msg) => {
                switch (msg.type) {
                    case MTypeTab.NEW_SLOT:
                        this.period = msg.payload;
                        cb(this.period);
                        break;
                    case MTypeTab.GET_DATA:
                        this.period = msg.payload.period;
                        cb(this.period);
                        break;
                    case MTypeTab.NETWORK_CHANGED:
                        this.period = msg.payload.period;
                        cb(this.period);
                        break;
                }
            });
            return {
                unsubscribe: () => obs()
            };
        }
    }
    _Blockchain_subject = new WeakMap();

    var _Wallet_instances, _Wallet_account, _Wallet_network, _Wallet_blockchain, _Wallet_stream, _Wallet_subject, _Wallet_connected, _Wallet_enabled, _Wallet_installed, _Wallet_ping, _Wallet_subscribe;
    class Wallet {
        get account() {
            return __classPrivateFieldGet(this, _Wallet_account, "f");
        }
        get network() {
            return __classPrivateFieldGet(this, _Wallet_network, "f");
        }
        get blockchain() {
            return __classPrivateFieldGet(this, _Wallet_blockchain, "f");
        }
        get connected() {
            return __classPrivateFieldGet(this, _Wallet_connected, "f");
        }
        get enabled() {
            return __classPrivateFieldGet(this, _Wallet_enabled, "f");
        }
        get installed() {
            return __classPrivateFieldGet(this, _Wallet_installed, "f");
        }
        constructor(stream, subject) {
            _Wallet_instances.add(this);
            _Wallet_account.set(this, void 0);
            _Wallet_network.set(this, void 0);
            _Wallet_blockchain.set(this, void 0);
            _Wallet_stream.set(this, void 0);
            _Wallet_subject.set(this, void 0);
            _Wallet_connected.set(this, false);
            _Wallet_enabled.set(this, false);
            _Wallet_installed.set(this, false);
            __classPrivateFieldSet(this, _Wallet_stream, stream, "f");
            __classPrivateFieldSet(this, _Wallet_subject, subject, "f");
            __classPrivateFieldSet(this, _Wallet_account, new Account(subject), "f");
            __classPrivateFieldSet(this, _Wallet_network, new Network(subject), "f");
            __classPrivateFieldSet(this, _Wallet_blockchain, new Blockchain(subject), "f");
            __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_subscribe).call(this);
        }
        async disconnect() {
            const type = MTypeTab.DISCONNECT_APP;
            const recipient = MTypeTabContent.CONTENT;
            const title = window.document.title;
            const icon = getFavicon();
            const uuid = uuidv4();
            const payload = {
                title,
                icon,
                uuid
            };
            await __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_ping).call(this);
            new ContentMessage({
                type,
                payload
            }).send(__classPrivateFieldGet(this, _Wallet_stream, "f"), recipient);
            return new Promise((resolve, reject) => {
                const obs = __classPrivateFieldGet(this, _Wallet_subject, "f").on((msg) => {
                    if (msg.type !== MTypeTab.DISCONNECT_APP_RESULT)
                        return;
                    if (msg.payload.uuid !== uuid)
                        return;
                    if (msg.payload.reject) {
                        obs();
                        return reject(new Error(msg.payload.reject));
                    }
                    __classPrivateFieldSet(this, _Wallet_connected, false, "f");
                    __classPrivateFieldGet(this, _Wallet_account, "f").base58 = undefined;
                    __classPrivateFieldGet(this, _Wallet_account, "f").accounts = [];
                    __classPrivateFieldGet(this, _Wallet_network, "f").net = msg.payload.net;
                    obs();
                    return resolve(this.connected);
                });
            });
        }
        async isMassaAddress(addr) {
            const type = MTypeTab.CHECK_MASSA_ADDRESS;
            const recipient = MTypeTabContent.CONTENT;
            const uuid = uuidv4();
            const payload = {
                uuid,
                addr
            };
            new ContentMessage({
                type,
                payload
            }).send(__classPrivateFieldGet(this, _Wallet_stream, "f"), recipient);
            return new Promise((resolve) => {
                const obs = __classPrivateFieldGet(this, _Wallet_subject, "f").on((msg) => {
                    if (msg.type !== MTypeTab.CHECK_MASSA_ADDRESS_RES)
                        return;
                    if (msg.payload.uuid !== uuid)
                        return;
                    obs();
                    return resolve(msg.payload.resolve);
                });
            });
        }
        async requestPubKey() {
            assert(this.connected, WALLET_IS_NOT_CONNECTED);
            const type = MTypeTab.REQUEST_PUB_KEY;
            const recipient = MTypeTabContent.CONTENT;
            const uuid = uuidv4();
            const title = window.document.title;
            const icon = getFavicon();
            const payload = {
                uuid,
                title,
                icon
            };
            await __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_ping).call(this);
            new ContentMessage({
                type,
                payload
            }).send(__classPrivateFieldGet(this, _Wallet_stream, "f"), recipient);
            return new Promise((resolve, reject) => {
                const obs = __classPrivateFieldGet(this, _Wallet_subject, "f").on((msg) => {
                    if (msg.type !== MTypeTab.RESPONSE_PUB_KEY)
                        return;
                    if (msg.payload.uuid !== uuid)
                        return;
                    if (msg.payload.reject) {
                        obs();
                        return reject(new Error(msg.payload.reject));
                    }
                    obs();
                    return resolve(msg.payload.resolve);
                });
            });
        }
        async connect() {
            const type = MTypeTab.CONNECT_APP;
            const recipient = MTypeTabContent.CONTENT;
            const uuid = uuidv4();
            const title = window.document.title;
            const icon = getFavicon();
            const payload = {
                title,
                icon,
                uuid
            };
            await __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_ping).call(this);
            new ContentMessage({
                type,
                payload
            }).send(__classPrivateFieldGet(this, _Wallet_stream, "f"), recipient);
            return new Promise((resolve, reject) => {
                const obs = __classPrivateFieldGet(this, _Wallet_subject, "f").on((msg) => {
                    if (msg.type !== MTypeTab.RESPONSE_CONNECT_APP)
                        return;
                    if (msg.payload.uuid !== uuid)
                        return;
                    if (msg.payload.reject) {
                        obs();
                        return reject(new Error(msg.payload.reject));
                    }
                    __classPrivateFieldSet(this, _Wallet_connected, Boolean(msg.payload.resolve), "f");
                    __classPrivateFieldGet(this, _Wallet_account, "f").base58 = msg.payload.base58;
                    __classPrivateFieldGet(this, _Wallet_account, "f").accounts = msg.payload.accounts;
                    __classPrivateFieldGet(this, _Wallet_network, "f").net = msg.payload.net;
                    obs();
                    return resolve(this.connected);
                });
            });
        }
        async signMessage(message) {
            assert(this.connected, WALLET_IS_NOT_CONNECTED);
            await __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_ping).call(this);
            const type = MTypeTab.SIGN_MESSAGE;
            const recipient = MTypeTabContent.CONTENT;
            const uuid = uuidv4();
            const title = window.document.title;
            const icon = getFavicon();
            const payload = {
                message,
                uuid,
                title,
                icon
            };
            new ContentMessage({
                type,
                payload
            }).send(__classPrivateFieldGet(this, _Wallet_stream, "f"), recipient);
            return new Promise((resolve, reject) => {
                const obs = __classPrivateFieldGet(this, _Wallet_subject, "f").on((msg) => {
                    if (msg.type !== MTypeTab.SING_MESSAGE_RESULT)
                        return;
                    if (msg.payload.uuid !== uuid)
                        return;
                    if (msg.payload && msg.payload.reject) {
                        obs();
                        return reject(new Error(msg.payload.reject));
                    }
                    obs();
                    return resolve(msg.payload.resolve);
                });
            });
        }
        async signTransaction(tx) {
            assert(this.connected, WALLET_IS_NOT_CONNECTED);
            assert(tx instanceof Transaction, INVALID_SIGN_PARAMS);
            await __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_ping).call(this);
            const type = MTypeTab.TX_TO_SEND;
            const recipient = MTypeTabContent.CONTENT;
            const uuid = uuidv4();
            const payload = {
                ...tx.payload,
                uuid,
                title: window.document.title,
                icon: getFavicon()
            };
            new ContentMessage({
                type,
                payload
            }).send(__classPrivateFieldGet(this, _Wallet_stream, "f"), recipient);
            return new Promise((resolve, reject) => {
                const obs = __classPrivateFieldGet(this, _Wallet_subject, "f").on((msg) => {
                    if (msg.type !== MTypeTab.TX_TO_SEND_RESULT)
                        return;
                    if (msg.payload.uuid !== uuid)
                        return;
                    if (msg.payload && msg.payload.reject) {
                        obs();
                        return reject(new Error(msg.payload.reject));
                    }
                    obs();
                    return resolve(msg.payload.resolve);
                });
            });
        }
    }
    _Wallet_account = new WeakMap(), _Wallet_network = new WeakMap(), _Wallet_blockchain = new WeakMap(), _Wallet_stream = new WeakMap(), _Wallet_subject = new WeakMap(), _Wallet_connected = new WeakMap(), _Wallet_enabled = new WeakMap(), _Wallet_installed = new WeakMap(), _Wallet_instances = new WeakSet(), _Wallet_ping = async function _Wallet_ping() {
        const type = MTypeTab.REQUEST_PING;
        const recipient = MTypeTabContent.CONTENT;
        const uuid = uuidv4();
        let sub;
        const fulfilled = () => {
            return new Promise((resolve, reject) => {
                sub = __classPrivateFieldGet(this, _Wallet_subject, "f").on((msg) => {
                    if (msg.type !== MTypeTab.PING_RESPONSE)
                        return;
                    if (!msg.payload || !msg.payload.uuid)
                        return;
                    if (msg.payload.uuid !== uuid)
                        return;
                    __classPrivateFieldSet(this, _Wallet_installed, true, "f");
                    sub();
                    return resolve(true);
                });
                new ContentMessage({
                    type,
                    payload: {
                        uuid
                    }
                }).send(__classPrivateFieldGet(this, _Wallet_stream, "f"), recipient);
                setTimeout(() => {
                    if (sub)
                        sub();
                    reject(new Error(NOT_INSTALLED));
                }, TIME_OUT_SECONDS);
            });
        };
        return fulfilled();
    }, _Wallet_subscribe = function _Wallet_subscribe() {
        if (!globalThis.window)
            return;
        __classPrivateFieldGet(this, _Wallet_subject, "f").on((msg) => {
            switch (msg.type) {
                case MTypeTab.NEW_SLOT:
                    __classPrivateFieldGet(this, _Wallet_blockchain, "f").period = msg.payload;
                    break;
                case MTypeTab.LOCKED:
                    __classPrivateFieldSet(this, _Wallet_enabled, msg.payload.enabled, "f");
                    break;
                case MTypeTab.ACCOUNT_CHANGED:
                    __classPrivateFieldGet(this, _Wallet_account, "f").base58 = msg.payload.base58;
                    break;
                case MTypeTab.GET_DATA:
                    __classPrivateFieldGet(this, _Wallet_blockchain, "f").period = msg.payload.period;
                    __classPrivateFieldGet(this, _Wallet_account, "f").base58 = msg.payload.base58;
                    __classPrivateFieldGet(this, _Wallet_account, "f").accounts = msg.payload.accounts;
                    __classPrivateFieldSet(this, _Wallet_enabled, msg.payload.enabled, "f");
                    __classPrivateFieldSet(this, _Wallet_connected, msg.payload.connected, "f");
                    __classPrivateFieldGet(this, _Wallet_network, "f").net = msg.payload.net;
                    __classPrivateFieldSet(this, _Wallet_installed, true, "f");
                    break;
                case MTypeTab.NETWORK_CHANGED:
                    __classPrivateFieldGet(this, _Wallet_network, "f").net = msg.payload.net;
                    __classPrivateFieldGet(this, _Wallet_blockchain, "f").period = msg.payload.period;
                    break;
            }
        });
    };

    var _Web3_handler, _Web3_provider;
    class Web3 {
        constructor() {
            _Web3_handler.set(this, new Handler());
            _Web3_provider.set(this, new ContentProvider(__classPrivateFieldGet(this, _Web3_handler, "f").stream, __classPrivateFieldGet(this, _Web3_handler, "f").subject));
            this.wallet = new Wallet(__classPrivateFieldGet(this, _Web3_handler, "f").stream, __classPrivateFieldGet(this, _Web3_handler, "f").subject);
            this.contract = new Contract(__classPrivateFieldGet(this, _Web3_provider, "f"), this.wallet);
            this.massa = new Massa(__classPrivateFieldGet(this, _Web3_provider, "f"), this.wallet);
            if (globalThis.window) {
                if (globalThis.window['bearby']) {
                    throw new Error(WEB3_INSTANCE_CREATED);
                }
                try {
                    __classPrivateFieldGet(this, _Web3_handler, "f").initialized();
                    globalThis.window['bearby'] = Object.freeze(this);
                }
                catch {
                    console.debug(AVAILABLE_ONLY_BROWSER);
                }
            }
        }
    }
    _Web3_handler = new WeakMap(), _Web3_provider = new WeakMap();

    function main() {
        if (globalThis.window && globalThis.window['bearby']) {
            return globalThis.window['bearby'];
        }
        return new Web3();
    }
    const web3 = main();

    exports.ContentProvider = ContentProvider;
    exports.Contract = Contract;
    exports.Massa = Massa;
    exports.Wallet = Wallet;
    exports.Web3 = Web3;
    exports.web3 = web3;

}));
//# sourceMappingURL=index.js.map
