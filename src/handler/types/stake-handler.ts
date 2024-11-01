import type { EventBuilder } from "../event-builder";
import type { StakeEventIter } from "./event-iterators";

export interface TStakingHandler {
  listenForStakingEvents(
    builder: EventBuilder,
    cb: StakeEventIter,
  ): Promise<void>;
}
