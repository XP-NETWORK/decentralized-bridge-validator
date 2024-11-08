import type { LockEvent, StakeEvent, TNftTransferDetailsObject } from ".";

export type LockEventIter = (event: LockEvent) => Promise<void>;
export type TNftTransferDetailsObjectIter = (
  nto: TNftTransferDetailsObject,
  id?: number,
) => Promise<void>;
export type StakeEventIter = (event: StakeEvent) => Promise<void>;
