(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

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
        LOCKED: `@/${app}/guard-just-lock`
    };

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
            this.stream.listen((msg) => {
                this.subject.emit(msg);
            });
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

    const FAVICON_REQUIRED = 'website favicon is required';

    function getFavicon() {
        let ref = globalThis.document.querySelector('link[rel*=\'icon\']');
        if (!ref) {
            throw new Error(FAVICON_REQUIRED);
        }
        return ref.href;
    }

    function uuidv4() {
        const size = 20;
        return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
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

    var _Network_subject, _Network_net, _Network_providers;
    class Network {
        constructor(subject, providers, net) {
            _Network_subject.set(this, void 0);
            _Network_net.set(this, void 0);
            _Network_providers.set(this, []);
            __classPrivateFieldSet(this, _Network_subject, subject, "f");
            if (net) {
                __classPrivateFieldSet(this, _Network_net, net, "f");
            }
            if (providers && providers.length > 0) {
                __classPrivateFieldSet(this, _Network_providers, providers, "f");
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
    _Network_subject = new WeakMap(), _Network_net = new WeakMap(), _Network_providers = new WeakMap();

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
        connect() {
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
                    obs();
                    return resolve(this.connected);
                });
            });
        }
    }
    _Wallet_account = new WeakMap(), _Wallet_network = new WeakMap(), _Wallet_stream = new WeakMap(), _Wallet_subject = new WeakMap(), _Wallet_connected = new WeakMap(), _Wallet_enabled = new WeakMap(), _Wallet_instances = new WeakSet(), _Wallet_subscribe = function _Wallet_subscribe() {
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
                    __classPrivateFieldSet(this, _Wallet_network, new Network(__classPrivateFieldGet(this, _Wallet_subject, "f"), msg.payload.providers, msg.payload.net), "f");
                    break;
                case MTypeTab.NETWORK_CHANGED:
                    __classPrivateFieldSet(this, _Wallet_network, new Network(__classPrivateFieldGet(this, _Wallet_subject, "f"), msg.payload.providers, msg.payload.net), "f");
                    break;
            }
        });
    };

    const handler = Object.freeze(new Handler());
    const wallet = Object.freeze(new Wallet(handler.stream, handler.subject));
    globalThis.window['bearby'] = wallet;
    handler.initialized();

}));
//# sourceMappingURL=index.js.map
