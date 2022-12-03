import type { ReqBody } from 'types';
export type Listener = (...args: ReqBody[]) => void;
export declare class Subject {
    #private;
    on(listener: Listener): () => void;
    removeListener(listener: Listener): void;
    removeAllListeners(): void;
    emit(...args: ReqBody[]): void;
    once(listener: Listener): void;
}
//# sourceMappingURL=subject.d.ts.map