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
    const AVAILABLE_ONLY_BROWSER = 'bearby-web3 available only browser';
    const WEB3_INSTANCE_CREATED = 'bearby Web3 instance already created!';

    class Transaction {
        constructor(type, amount, recipient, parameter, contract, functionName, datastore) {
            this.type = type;
            this.amount = String(amount);
            this.recipient = recipient;
            this.parameter = parameter;
            this.contract = contract;
            this.functionName = functionName;
            this.datastore = datastore;
        }
        get payload() {
            return JSON.parse(JSON.stringify({
                type: this.type,
                amount: this.amount,
                fee: this.fee,
                gasPrice: this.gasPrice,
                gasLimit: this.gasLimit,
                coins: this.coins,
                code: this.contract,
                func: this.functionName,
                params: JSON.stringify(this.parameter),
                parallelCoins: this.parallelCoins,
                sequentialCoins: this.sequentialCoins,
                toAddr: this.recipient,
                datastore: this.datastore
            }));
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

    var _Contract_provider, _Contract_wallet;
    class Contract {
        constructor(provider, wallet) {
            _Contract_provider.set(this, void 0);
            _Contract_wallet.set(this, void 0);
            __classPrivateFieldSet(this, _Contract_provider, provider, "f");
            __classPrivateFieldSet(this, _Contract_wallet, wallet, "f");
        }
        deploy(params) {
            const transaction = new Transaction(OperationsType.ExecuteSC, '0', undefined, undefined, params.contractDataBase64, undefined, params.datastore);
            transaction.fee = String(params.fee);
            transaction.gasLimit = Number(params.maxGas);
            transaction.gasPrice = Number(params.gasPrice);
            return __classPrivateFieldGet(this, _Contract_wallet, "f").signTransaction(transaction);
        }
        call() { }
        read() { }
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
        constructor(msg) {
            _ContentMessage_body.set(this, void 0);
            __classPrivateFieldSet(this, _ContentMessage_body, msg, "f");
        }
        get type() {
            return __classPrivateFieldGet(this, _ContentMessage_body, "f").type;
        }
        get payload() {
            return __classPrivateFieldGet(this, _ContentMessage_body, "f").payload;
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

    var JsonRPCRequestMethods;
    (function (JsonRPCRequestMethods) {
        JsonRPCRequestMethods["GET_STATUS"] = "get_status";
        JsonRPCRequestMethods["GET_ADDRESSES"] = "get_addresses";
        // SEND_OPERATIONS              = 'send_operations',
        JsonRPCRequestMethods["GET_BLOCKS"] = "get_block";
        JsonRPCRequestMethods["GET_ENDORSEMENTS"] = "get_endorsements";
        JsonRPCRequestMethods["GET_OPERATIONS"] = "get_operations";
        JsonRPCRequestMethods["GET_CLIQUES"] = "get_cliques";
        JsonRPCRequestMethods["GET_STAKERS"] = "get_stakers";
        JsonRPCRequestMethods["GET_FILTERED_SC_OUTPUT_EVENT"] = "get_filtered_sc_output_event";
        JsonRPCRequestMethods["EXECUTE_READ_ONLY_BYTECODE"] = "execute_read_only_bytecode";
        JsonRPCRequestMethods["EXECUTE_READ_ONLY_CALL"] = "execute_read_only_call";
        // GET_DATASTORE_ENTRIES        = 'get_datastore_entries'
    })(JsonRPCRequestMethods || (JsonRPCRequestMethods = {}));

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
        async getFilteredSCOutputEvent(filter) {
            const method = JsonRPCRequestMethods.GET_FILTERED_SC_OUTPUT_EVENT;
            return __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                    method,
                    params: [filter]
                }]);
        }
        async executeReadOlyBytecode(params) {
            const method = JsonRPCRequestMethods.EXECUTE_READ_ONLY_BYTECODE;
            return __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                    method,
                    params: [params]
                }]);
        }
        async executeReadOnlyCall(params) {
            const method = JsonRPCRequestMethods.EXECUTE_READ_ONLY_CALL;
            return __classPrivateFieldGet(this, _Massa_provider, "f").send([{
                    method,
                    params: [params]
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

    var _Account_subject, _Account_base58;
    class Account {
        constructor(subject, base58) {
            _Account_subject.set(this, void 0);
            _Account_base58.set(this, void 0);
            __classPrivateFieldSet(this, _Account_subject, subject, "f");
            __classPrivateFieldSet(this, _Account_base58, base58, "f");
        }
        get base58() {
            return __classPrivateFieldGet(this, _Account_base58, "f");
        }
        subscribe(cb) {
            if (this.base58) {
                cb(this.base58);
            }
            const obs = __classPrivateFieldGet(this, _Account_subject, "f").on((msg) => {
                switch (msg.type) {
                    case MTypeTab.ACCOUNT_CHANGED:
                        __classPrivateFieldSet(this, _Account_base58, msg.payload.base58, "f");
                        break;
                    case MTypeTab.GET_DATA:
                        __classPrivateFieldSet(this, _Account_base58, msg.payload.base58, "f");
                        break;
                    default:
                        return;
                }
                cb(__classPrivateFieldGet(this, _Account_base58, "f"));
            });
            return {
                unsubscribe: () => obs()
            };
        }
    }
    _Account_subject = new WeakMap(), _Account_base58 = new WeakMap();

    var _Network_subject, _Network_net;
    class Network {
        constructor(subject, net) {
            _Network_subject.set(this, void 0);
            _Network_net.set(this, void 0);
            __classPrivateFieldSet(this, _Network_subject, subject, "f");
            if (net) {
                __classPrivateFieldSet(this, _Network_net, net, "f");
            }
        }
        get net() {
            return __classPrivateFieldGet(this, _Network_net, "f");
        }
        subscribe(cb) {
            cb(this.net);
            const obs = __classPrivateFieldGet(this, _Network_subject, "f").on((msg) => {
                switch (msg.type) {
                    case MTypeTab.GET_DATA:
                        __classPrivateFieldSet(this, _Network_net, msg.payload.net, "f");
                        break;
                    case MTypeTab.NETWORK_CHANGED:
                        __classPrivateFieldSet(this, _Network_net, msg.payload.net, "f");
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
    _Network_subject = new WeakMap(), _Network_net = new WeakMap();

    var _Wallet_instances, _Wallet_account, _Wallet_network, _Wallet_stream, _Wallet_subject, _Wallet_connected, _Wallet_enabled, _Wallet_subscribe;
    class Wallet {
        constructor(stream, subject) {
            _Wallet_instances.add(this);
            _Wallet_account.set(this, void 0);
            _Wallet_network.set(this, void 0);
            _Wallet_stream.set(this, void 0);
            _Wallet_subject.set(this, void 0);
            _Wallet_connected.set(this, false);
            _Wallet_enabled.set(this, false);
            __classPrivateFieldSet(this, _Wallet_stream, stream, "f");
            __classPrivateFieldSet(this, _Wallet_subject, subject, "f");
            __classPrivateFieldSet(this, _Wallet_account, new Account(subject), "f");
            __classPrivateFieldSet(this, _Wallet_network, new Network(subject), "f");
            __classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_subscribe).call(this);
        }
        get account() {
            return __classPrivateFieldGet(this, _Wallet_account, "f");
        }
        get network() {
            return __classPrivateFieldGet(this, _Wallet_network, "f");
        }
        get connected() {
            return __classPrivateFieldGet(this, _Wallet_connected, "f");
        }
        get enabled() {
            return __classPrivateFieldGet(this, _Wallet_enabled, "f");
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
                    __classPrivateFieldSet(this, _Wallet_account, new Account(__classPrivateFieldGet(this, _Wallet_subject, "f"), msg.payload.base58), "f");
                    __classPrivateFieldSet(this, _Wallet_network, new Network(__classPrivateFieldGet(this, _Wallet_subject, "f"), msg.payload.net), "f");
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
        subscribe(cb) {
            const obs = __classPrivateFieldGet(this, _Wallet_subject, "f").on(() => {
                // emit only in the end of evenloop.
                setTimeout(() => cb(), 1);
            });
            return {
                unsubscribe: () => obs()
            };
        }
    }
    _Wallet_account = new WeakMap(), _Wallet_network = new WeakMap(), _Wallet_stream = new WeakMap(), _Wallet_subject = new WeakMap(), _Wallet_connected = new WeakMap(), _Wallet_enabled = new WeakMap(), _Wallet_instances = new WeakSet(), _Wallet_subscribe = function _Wallet_subscribe() {
        if (!globalThis.window)
            return;
        __classPrivateFieldGet(this, _Wallet_subject, "f").on((msg) => {
            switch (msg.type) {
                case MTypeTab.LOCKED:
                    __classPrivateFieldSet(this, _Wallet_enabled, msg.payload.enabled, "f");
                    break;
                case MTypeTab.ACCOUNT_CHANGED:
                    __classPrivateFieldSet(this, _Wallet_account, new Account(__classPrivateFieldGet(this, _Wallet_subject, "f"), msg.payload.base58), "f");
                    break;
                case MTypeTab.GET_DATA:
                    __classPrivateFieldSet(this, _Wallet_account, new Account(__classPrivateFieldGet(this, _Wallet_subject, "f"), msg.payload.base58), "f");
                    __classPrivateFieldSet(this, _Wallet_enabled, msg.payload.enabled, "f");
                    __classPrivateFieldSet(this, _Wallet_connected, msg.payload.connected, "f");
                    __classPrivateFieldSet(this, _Wallet_network, new Network(__classPrivateFieldGet(this, _Wallet_subject, "f"), msg.payload.net), "f");
                    break;
                case MTypeTab.NETWORK_CHANGED:
                    __classPrivateFieldSet(this, _Wallet_network, new Network(__classPrivateFieldGet(this, _Wallet_subject, "f"), msg.payload.net), "f");
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
                catch (_a) {
                    console.debug(AVAILABLE_ONLY_BROWSER);
                }
            }
        }
    }
    _Web3_handler = new WeakMap(), _Web3_provider = new WeakMap();

    const web3 = new Web3();

    exports.ContentProvider = ContentProvider;
    exports.Massa = Massa;
    exports.Wallet = Wallet;
    exports.Web3 = Web3;
    exports.default = web3;
    exports.web3 = web3;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
