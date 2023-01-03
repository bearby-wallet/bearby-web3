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
const AVAILABLE_ONLY_BROWSER = 'bearby-web3 available only browser';
const WEB3_INSTANCE_CREATED = 'bearby Web3 instance already created!';
const LONG_STRING = 'Input string is too long max is';

class Transaction {
    get payload() {
        return JSON.parse(JSON.stringify({
            type: this.type,
            amount: this.amount,
            fee: this.fee,
            gasPrice: this.gasPrice,
            gasLimit: this.gasLimit,
            coins: String(this.coins),
            code: this.contract,
            func: this.functionName,
            params: JSON.stringify(this.parameter),
            toAddr: this.recipient || this.contract,
            datastore: this.datastore
        }));
    }
    constructor(type, amount, recipient, parameter, contract, functionName, datastore) {
        this.type = type;
        this.amount = String(amount);
        this.recipient = recipient;
        this.parameter = parameter;
        this.contract = contract;
        this.functionName = functionName;
        this.datastore = datastore;
    }
}

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
    JsonRPCRequestMethods["GET_BLOCKS"] = "get_block";
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

function assert(expressions, msg) {
    if (!expressions) {
        throw new Error(msg);
    }
}

var _Args_instances, _Args_offset, _Args_serialized, _Args_toByteString, _Args_fromByteString, _Args_concatArrays;
class Args {
    /**
     *
     * @param {string} serialized
     * @example
     * import { web3 } from '@hicaru/bearby.js';
     * const args1 = new web3.Args();
     *     // add some arguments
     * args1
     *  .addString("hello")
     *  .addString("world")
     *  .addU32(97);
     */
    constructor(serialized = []) {
        _Args_instances.add(this);
        _Args_offset.set(this, 0);
        _Args_serialized.set(this, void 0);
        __classPrivateFieldSet(this, _Args_serialized, Uint8Array.from(serialized), "f");
    }
    serialize() {
        return Array.from(__classPrivateFieldGet(this, _Args_serialized, "f"));
    }
    nextString() {
        const length = Number(this.nextU32());
        const end = __classPrivateFieldGet(this, _Args_offset, "f") + length;
        const result = __classPrivateFieldGet(this, _Args_instances, "m", _Args_toByteString).call(this, __classPrivateFieldGet(this, _Args_serialized, "f").slice(__classPrivateFieldGet(this, _Args_offset, "f"), end));
        __classPrivateFieldSet(this, _Args_offset, end, "f");
        return result;
    }
    nextU32() {
        const buffer = __classPrivateFieldGet(this, _Args_serialized, "f").buffer;
        const view = new DataView(buffer);
        const value = view.getUint32(__classPrivateFieldGet(this, _Args_offset, "f"), true);
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + 4, "f");
        return value;
    }
    nextU64() {
        const buffer = __classPrivateFieldGet(this, _Args_serialized, "f").buffer;
        const view = new DataView(buffer);
        const value = view.getBigUint64(__classPrivateFieldGet(this, _Args_offset, "f"), true);
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + 8, "f");
        return value;
    }
    nextI32() {
        const buffer = __classPrivateFieldGet(this, _Args_serialized, "f").buffer;
        const view = new DataView(buffer);
        const value = view.getInt32(__classPrivateFieldGet(this, _Args_offset, "f"), true);
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + 4, "f");
        return value;
    }
    nextI64() {
        const buffer = __classPrivateFieldGet(this, _Args_serialized, "f").buffer;
        const view = new DataView(buffer);
        const value = view.getBigInt64(__classPrivateFieldGet(this, _Args_offset, "f"), true);
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + 8, "f");
        return value;
    }
    nextF32() {
        const buffer = __classPrivateFieldGet(this, _Args_serialized, "f").buffer;
        const view = new DataView(buffer);
        const value = view.getFloat32(__classPrivateFieldGet(this, _Args_offset, "f"), true);
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + 4, "f");
        return value;
    }
    nextF64() {
        const buffer = __classPrivateFieldGet(this, _Args_serialized, "f").buffer;
        const view = new DataView(buffer);
        const value = view.getFloat64(__classPrivateFieldGet(this, _Args_offset, "f"), true);
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + 8, "f");
        return value;
    }
    nextUint8Array() {
        const length = Number(this.nextU32());
        const byteArray = __classPrivateFieldGet(this, _Args_serialized, "f").slice(__classPrivateFieldGet(this, _Args_offset, "f"), (__classPrivateFieldGet(this, _Args_offset, "f")) + length);
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + length, "f");
        return byteArray;
    }
    addU32(n) {
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setUint32(0, Number(n), true);
        __classPrivateFieldSet(this, _Args_serialized, __classPrivateFieldGet(this, _Args_instances, "m", _Args_concatArrays).call(this, __classPrivateFieldGet(this, _Args_serialized, "f"), new Uint8Array(view.buffer)), "f");
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + 4, "f");
        return this;
    }
    addU64(n) {
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        view.setBigUint64(0, BigInt(n), true);
        __classPrivateFieldSet(this, _Args_serialized, __classPrivateFieldGet(this, _Args_instances, "m", _Args_concatArrays).call(this, __classPrivateFieldGet(this, _Args_serialized, "f"), new Uint8Array(view.buffer)), "f");
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + 8, "f");
        return this;
    }
    addI32(n) {
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setInt32(0, n, true);
        __classPrivateFieldSet(this, _Args_serialized, __classPrivateFieldGet(this, _Args_instances, "m", _Args_concatArrays).call(this, __classPrivateFieldGet(this, _Args_serialized, "f"), new Uint8Array(view.buffer)), "f");
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + 4, "f");
        return this;
    }
    addI64(n) {
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        view.setBigInt64(0, BigInt(n), true);
        __classPrivateFieldSet(this, _Args_serialized, __classPrivateFieldGet(this, _Args_instances, "m", _Args_concatArrays).call(this, __classPrivateFieldGet(this, _Args_serialized, "f"), new Uint8Array(view.buffer)), "f");
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + 8, "f");
        return this;
    }
    addF32(number) {
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setFloat32(0, number, true);
        __classPrivateFieldSet(this, _Args_serialized, __classPrivateFieldGet(this, _Args_instances, "m", _Args_concatArrays).call(this, __classPrivateFieldGet(this, _Args_serialized, "f"), new Uint8Array(view.buffer)), "f");
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + 4, "f");
        return this;
    }
    addF64(number) {
        const buffer = new ArrayBuffer(8);
        const view = new DataView(buffer);
        view.setFloat64(0, number, true);
        __classPrivateFieldSet(this, _Args_serialized, __classPrivateFieldGet(this, _Args_instances, "m", _Args_concatArrays).call(this, __classPrivateFieldGet(this, _Args_serialized, "f"), new Uint8Array(view.buffer)), "f");
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + 8, "f");
        return this;
    }
    addUint8Array(array) {
        this.addU32(array.length);
        __classPrivateFieldSet(this, _Args_serialized, __classPrivateFieldGet(this, _Args_instances, "m", _Args_concatArrays).call(this, __classPrivateFieldGet(this, _Args_serialized, "f"), array), "f");
        __classPrivateFieldSet(this, _Args_offset, __classPrivateFieldGet(this, _Args_offset, "f") + array.length, "f");
        return this;
    }
    /**
     * Adds an argument to the serialized byte string if the argument is an
     * instance of a handled type (String of 4294967295 characters maximum)
     */
    addString(arg) {
        const maxSize = 4294967295;
        const size = arg.length;
        assert(size <= maxSize, LONG_STRING);
        this.addU32(size);
        __classPrivateFieldSet(this, _Args_serialized, __classPrivateFieldGet(this, _Args_instances, "m", _Args_concatArrays).call(this, __classPrivateFieldGet(this, _Args_serialized, "f"), __classPrivateFieldGet(this, _Args_instances, "m", _Args_fromByteString).call(this, arg)), "f");
        return this;
    }
}
_Args_offset = new WeakMap(), _Args_serialized = new WeakMap(), _Args_instances = new WeakSet(), _Args_toByteString = function _Args_toByteString(bytes) {
    let s = "";
    for (let i = 0; i < bytes.length; i++) {
        s += String.fromCharCode(bytes[i]);
    }
    return s;
}, _Args_fromByteString = function _Args_fromByteString(byteString) {
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteArray.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
    }
    return byteArray;
}, _Args_concatArrays = function _Args_concatArrays(a, b) {
    const c = new Uint8Array(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
};

var _Contract_provider, _Contract_wallet;
class Contract {
    constructor(provider, wallet) {
        _Contract_provider.set(this, void 0);
        _Contract_wallet.set(this, void 0);
        this.Args = Args;
        __classPrivateFieldSet(this, _Contract_provider, provider, "f");
        __classPrivateFieldSet(this, _Contract_wallet, wallet, "f");
    }
    async deploy(params) {
        const transaction = new Transaction(OperationsType.ExecuteSC, '0', undefined, undefined, params.contractDataBase64, undefined, params.datastore);
        transaction.fee = String(params.fee);
        transaction.gasLimit = Number(params.maxGas);
        transaction.gasPrice = Number(params.gasPrice);
        return __classPrivateFieldGet(this, _Contract_wallet, "f").signTransaction(transaction);
    }
    async call(params) {
        const transaction = new Transaction(OperationsType.CallSC, '0', undefined, params.parameter, params.targetAddress, params.functionName);
        transaction.fee = String(params.fee);
        transaction.gasLimit = Number(params.maxGas);
        transaction.coins = String(params.coins || 0);
        transaction.gasPrice = Number(params.gasPrice || 0);
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
                        simulated_gas_price: String(v.simulatedGasPrice),
                        target_address: v.targetAddress,
                        target_function: v.targetFunction,
                        parameter: v.parameter,
                        caller_address: v.callerAddress || __classPrivateFieldGet(this, _Contract_wallet, "f").account.base58
                    }))]
            }]);
        if (params.length === 1) {
            return responses[0];
        }
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
    LOCKED: `@/${app}/guard-just-lock`,
    TX_TO_SEND: `@/${app}/add-tx-to-send`,
    TX_TO_SEND_RESULT: `@/${app}/response-tx-result`,
    SIGN_MESSAGE: `@/${app}/sign-message-call`,
    SING_MESSAGE_RESULT: `@/${app}/sign-message-response`
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
        return __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                method,
                params: []
            }]);
    }
    async getAddresses(...addresses) {
        const method = JsonRPCRequestMethods.GET_ADDRESSES;
        return __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                method,
                params: [addresses]
            }]);
    }
    async getBlocks(...blocks) {
        const method = JsonRPCRequestMethods.GET_BLOCKS;
        return __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                method,
                params: [blocks]
            }]);
    }
    async getGraphInterval(start, end) {
        const method = JsonRPCRequestMethods.GET_GRAPH_INTERVAL;
        return __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                method,
                params: [{
                        start,
                        end
                    }]
            }]);
    }
    async getOperations(...operations) {
        const method = JsonRPCRequestMethods.GET_OPERATIONS;
        return __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                method,
                params: [operations]
            }]);
    }
    async getStakers() {
        const method = JsonRPCRequestMethods.GET_STAKERS;
        return __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                method,
                params: []
            }]);
    }
    async getEndorsements(...Ids) {
        const method = JsonRPCRequestMethods.GET_ENDORSEMENTS;
        return __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                method,
                params: [Ids]
            }]);
    }
    async getCliques() {
        const method = JsonRPCRequestMethods.GET_CLIQUES;
        return __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                method,
                params: []
            }]);
    }
    async payment(amount, recipient) {
        const transaction = new Transaction(OperationsType.Payment, amount, recipient);
        return __classPrivateFieldGet(this, _Massa_wallet, "f").signTransaction(transaction);
    }
    async buyRolls(amount) {
        const transaction = new Transaction(OperationsType.RollBuy, amount);
        return __classPrivateFieldGet(this, _Massa_wallet, "f").signTransaction(transaction);
    }
    async sellRolls(amount) {
        const transaction = new Transaction(OperationsType.RollSell, amount);
        return __classPrivateFieldGet(this, _Massa_wallet, "f").signTransaction(transaction);
    }
}
_Massa_provider = new WeakMap(), _Massa_wallet = new WeakMap();

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
    }
    subscribe(cb) {
        if (this.base58) {
            cb(this.base58);
        }
        const obs = __classPrivateFieldGet(this, _Account_subject, "f").on((msg) => {
            switch (msg.type) {
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

var _Wallet_instances, _Wallet_account, _Wallet_network, _Wallet_blockchain, _Wallet_stream, _Wallet_subject, _Wallet_connected, _Wallet_enabled, _Wallet_subscribe;
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
    constructor(stream, subject) {
        _Wallet_instances.add(this);
        _Wallet_account.set(this, void 0);
        _Wallet_network.set(this, void 0);
        _Wallet_blockchain.set(this, void 0);
        _Wallet_stream.set(this, void 0);
        _Wallet_subject.set(this, void 0);
        _Wallet_connected.set(this, false);
        _Wallet_enabled.set(this, false);
        __classPrivateFieldSet(this, _Wallet_stream, stream, "f");
        __classPrivateFieldSet(this, _Wallet_subject, subject, "f");
        __classPrivateFieldSet(this, _Wallet_account, new Account(subject), "f");
        __classPrivateFieldSet(this, _Wallet_network, new Network(subject), "f");
        __classPrivateFieldSet(this, _Wallet_blockchain, new Blockchain(subject), "f");
        __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_subscribe).call(this);
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
                __classPrivateFieldGet(this, _Wallet_network, "f").net = msg.payload.net;
                obs();
                return resolve(this.connected);
            });
        });
    }
    async signMessage(message) {
        assert(this.connected, WALLET_IS_NOT_CONNECTED);
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
_Wallet_account = new WeakMap(), _Wallet_network = new WeakMap(), _Wallet_blockchain = new WeakMap(), _Wallet_stream = new WeakMap(), _Wallet_subject = new WeakMap(), _Wallet_connected = new WeakMap(), _Wallet_enabled = new WeakMap(), _Wallet_instances = new WeakSet(), _Wallet_subscribe = function _Wallet_subscribe() {
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
                __classPrivateFieldSet(this, _Wallet_enabled, msg.payload.enabled, "f");
                __classPrivateFieldSet(this, _Wallet_connected, msg.payload.connected, "f");
                __classPrivateFieldGet(this, _Wallet_network, "f").net = msg.payload.net;
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

export { Args, ContentProvider, Contract, Massa, Wallet, Web3, web3 };
//# sourceMappingURL=index.js.map
