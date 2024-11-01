import type { LockEvent, StakeEvent } from ".";

export type LockEventIter = (event: LockEvent) => Promise<void>;
export type StakeEventIter = (event: StakeEvent) => Promise<void>;
