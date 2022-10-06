import type { ReqBody } from 'types';
declare type Listener = (...args: ReqBody[]) => void;
export declare class Subject {
    #private;
    on(listener: Listener): () => void;
    removeListener(listener: Listener): void;
    removeAllListeners(): void;
    emit(...args: ReqBody[]): void;
    once(listener: Listener): void;
}
export {};
