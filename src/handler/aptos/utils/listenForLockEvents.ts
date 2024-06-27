import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
// import { EventBuilder } from "../..";
// import { EntityManager } from "@mikro-orm/sqlite";
// import { LockEventIter } from "../../types";
import { Network } from "aptos";
import log from "./log";

const listenForLockEvents = async (
  // builder: EventBuilder,
  // cb: LockEventIter,
  // lastBlock_: number,
  client: Aptos,
  // blockChunks: number,
  // bridge: string,
  // em: EntityManager,
) => {
  // let lastBlock = lastBlock_;
  // while (true) {
  try {
    const events = await client.getModuleEventsByEventType({
      eventType:
        "0xc330facb9a44565be9a6728a9747305e446313b7a8beb7bdd30c5e97f9cda477::aptos_nft_bridge::Claim721Event",
      options: {
        limit: 1,
        offset: 0,
      },
    });
    console.log({ events });
  } catch (e) {
    log(`${e} while listening for events. Sleeping for 10 seconds`);
    await new Promise<undefined>((resolve) => setTimeout(resolve, 10000));
  }
  // }
};

async function test() {
  const DEVNET_CONFIG = new AptosConfig({
    network: Network.DEVNET,
  });
  const DEVNET_CLIENT = new Aptos(DEVNET_CONFIG);

  await listenForLockEvents(DEVNET_CLIENT);
}

test();

export default listenForLockEvents;
