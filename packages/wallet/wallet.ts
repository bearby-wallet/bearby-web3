import { SignedMessage } from "../../types";

import { MTypeTab, MTypeTabContent } from "../../config/stream-keys";
import { assert } from "../../lib/assert";
import { INVALID_SIGN_PARAMS, WALLET_IS_NOT_CONNECTED } from "../../lib/errors";
import { getFavicon } from "../../lib/favicon";
import { ContentMessage } from "../../lib/secure-message";
import { Subject } from "../../lib/subject";
import { TabStream } from "../../lib/tab-stream";
import { Transaction } from "../../lib/transaction";
import { uuidv4 } from "../../lib/uuid";
import { Account } from './account';
import { Network } from "./network";
import { Blockchain } from "./blockchain";


export class Wallet {
  #account: Account;
  #network: Network;
  #blockchain: Blockchain;
  #stream: TabStream;
  #subject: Subject;

  #connected = false;
  #enabled = false;


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

  constructor(stream: TabStream, subject: Subject) {
    this.#stream = stream;
    this.#subject = subject;
    this.#account = new Account(subject);
    this.#network = new Network(subject);
    this.#blockchain = new Blockchain(subject);
    this.#subscribe();
  }

  async diconnect(): Promise<boolean> {
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
        this.#network.net = msg.payload.net;

        obs();
        return resolve(this.connected);
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
        this.#network.net = msg.payload.net;

        obs();
        return resolve(this.connected);
      });
    });
  }

  async signMessage(message: string): Promise<SignedMessage> {
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

  #subscribe() {
    if (!globalThis.window) return;

    this.#subject.on((msg) => {
      switch (msg.type) {
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
          this.#enabled = msg.payload.enabled;
          this.#connected = msg.payload.connected;

          this.#network.net = msg.payload.net;
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
