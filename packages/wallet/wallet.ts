import { SignedMessage } from "../../types";

import { MTypeTab, MTypeTabContent } from "../../config/stream-keys";
import { assert } from "../../lib/assert";
import { INVALID_SIGN_PARAMS, NOT_INSTALLED, WALLET_IS_NOT_CONNECTED } from "../../lib/errors";
import { getFavicon } from "../../lib/favicon";
import { ContentMessage } from "../../lib/secure-message";
import { Subject } from "../../lib/subject";
import { TabStream } from "../../lib/tab-stream";
import { Transaction } from "../../lib/transaction";
import { uuidv4 } from "../../lib/uuid";
import { Account } from './account';
import { Network } from "./network";
import { Blockchain } from "./blockchain";
import { TIME_OUT_SECONDS } from "config/common";


export class Wallet {
  #account: Account;
  #network: Network;
  #blockchain: Blockchain;
  #stream: TabStream;
  #subject: Subject;

  #connected = false;
  #enabled = false;
  #installed = false;


  get account() {
    return this.#account;
  }

  get network() {
    return this.#network;
  }

  get blockchain() {
    return this.#blockchain;
  }

  get connected() {
    return this.#connected;
  }

  get enabled() {
    return this.#enabled;
  }

  get installed() {
    return this.#installed;
  }

  constructor(stream: TabStream, subject: Subject) {
    this.#stream = stream;
    this.#subject = subject;
    this.#account = new Account(subject);
    this.#network = new Network(subject);
    this.#blockchain = new Blockchain(subject);
    this.#subscribe();
  }

  async disconnect(): Promise<boolean> {
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

    await this.#ping();

    new ContentMessage({
      type,
      payload
    }).send(this.#stream, recipient);

    return new Promise((resolve, reject) => {
      const obs = this.#subject.on((msg) => {
        if (msg.type !== MTypeTab.DISCONNECT_APP_RESULT) return;
        if (msg.payload.uuid !== uuid) return;

        if (msg.payload.reject) {
          obs();
          return reject(new Error(msg.payload.reject));
        }

        this.#connected = false;
        this.#account.base58 = undefined;
        this.#account.accounts = [];
        this.#network.net = msg.payload.net;

        obs();
        return resolve(this.connected);
      });
    });
  }

  async isMassaAddress(addr: string) {
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
    }).send(this.#stream, recipient);

    return new Promise((resolve) => {
      const obs = this.#subject.on((msg) => {
        if (msg.type !== MTypeTab.CHECK_MASSA_ADDRESS_RES) return;
        if (msg.payload.uuid !== uuid) return;

        obs();
        return resolve(msg.payload.resolve);
      });
    });
  }

  async requestPubKey(): Promise<string> {
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

    await this.#ping();

    new ContentMessage({
      type,
      payload
    }).send(this.#stream, recipient);

    return new Promise((resolve, reject) => {
      const obs = this.#subject.on((msg) => {
        if (msg.type !== MTypeTab.RESPONSE_PUB_KEY) return;
        if (msg.payload.uuid !== uuid) return;

        if (msg.payload.reject) {
          obs();
          return reject(new Error(msg.payload.reject));
        }

        obs();
        return resolve(msg.payload.resolve);
      });
    });
  }

  async connect(): Promise<boolean> {
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

    await this.#ping();

    new ContentMessage({
      type,
      payload
    }).send(this.#stream, recipient);

    return new Promise((resolve, reject) => {
      const obs = this.#subject.on((msg) => {
        if (msg.type !== MTypeTab.RESPONSE_CONNECT_APP) return;
        if (msg.payload.uuid !== uuid) return;

        if (msg.payload.reject) {
          obs();
          return reject(new Error(msg.payload.reject));
        }

        this.#connected = Boolean(msg.payload.resolve);

        this.#account.base58 = msg.payload.base58;
        this.#account.accounts = msg.payload.accounts;
        this.#network.net = msg.payload.net;

        obs();
        return resolve(this.connected);
      });
    });
  }

  async signMessage(message: string): Promise<SignedMessage> {
    assert(this.connected, WALLET_IS_NOT_CONNECTED);

    await this.#ping();

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
    }).send(this.#stream, recipient);

    return new Promise((resolve, reject) => {
      const obs = this.#subject.on((msg) => {
        if (msg.type !== MTypeTab.SING_MESSAGE_RESULT) return;
        if (msg.payload.uuid !== uuid) return;

        if (msg.payload && msg.payload.reject) {
          obs();
          return reject(new Error(msg.payload.reject));
        }

        obs();
        return resolve(msg.payload.resolve as SignedMessage);
      });
    });
  }

  async signTransaction(tx: Transaction): Promise<string> {
    assert(this.connected, WALLET_IS_NOT_CONNECTED);
    assert(tx instanceof Transaction, INVALID_SIGN_PARAMS);

    await this.#ping();

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
    }).send(this.#stream, recipient);

    return new Promise((resolve, reject) => {
      const obs = this.#subject.on((msg) => {
        if (msg.type !== MTypeTab.TX_TO_SEND_RESULT) return;
        if (msg.payload.uuid !== uuid) return;

        if (msg.payload && msg.payload.reject) {
          obs();
          return reject(new Error(msg.payload.reject));
        }

        obs();
        return resolve(msg.payload.resolve as string);
      });
    });
  }

  async #ping(): Promise<boolean> {
    const type = MTypeTab.REQUEST_PING;
    const recipient = MTypeTabContent.CONTENT;
    const uuid = uuidv4();
    let sub: Function;

    const fulfilled = () => {
      return new Promise((resolve, reject) => {
        sub = this.#subject.on((msg) => {
          if (msg.type !== MTypeTab.PING_RESPONSE) return;
          if (!msg.payload || !msg.payload.uuid) return;
          if (msg.payload.uuid !== uuid) return;

          this.#installed = true;

          sub();
          return resolve(true);
        });

        new ContentMessage({
          type,
          payload: {
            uuid
          }
        }).send(this.#stream, recipient);

        setTimeout(() => {
          if (sub) sub();

          reject(new Error(NOT_INSTALLED));
        }, TIME_OUT_SECONDS);
      });
    };

    return fulfilled() as Promise<boolean>;
  }

  #subscribe() {
    if (!globalThis.window) return;

    this.#subject.on((msg) => {
      switch (msg.type) {
        case MTypeTab.CONNECTION_CHANGED:
          if (msg.payload && msg.payload.base58 && msg.payload.accounts) {
            this.account.base58 = msg.payload.base58;
            this.account.accounts = msg.payload.accounts;
          }
          break;
        case MTypeTab.NEW_SLOT:
          this.#blockchain.period = msg.payload;
          break;
        case MTypeTab.LOCKED:
          this.#enabled = msg.payload.enabled;
          break;
        case MTypeTab.ACCOUNT_CHANGED:
          this.#account.base58 = msg.payload.base58;
          break;
        case MTypeTab.GET_DATA:
          this.#blockchain.period = msg.payload.period;
          this.#account.base58 = msg.payload.base58;
          this.#account.accounts = msg.payload.accounts;
          this.#enabled = msg.payload.enabled;
          this.#connected = msg.payload.connected;

          this.#network.net = msg.payload.net;
          this.#installed = true;
          break;
        case MTypeTab.NETWORK_CHANGED:
          this.#network.net = msg.payload.net;
          this.#blockchain.period = msg.payload.period;
          break;
        default:
          break;
      }
    });
  }
}
