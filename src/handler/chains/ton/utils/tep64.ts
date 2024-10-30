import { type Cell, Dictionary, beginCell } from "@ton/core";
import { sha256_sync } from "@ton/crypto";

export const ONCHAIN_CONTENT_PREFIX = 0x00;
export const OFFCHAIN_TAG = 0x01;
export const SNAKE_PREFIX = 0x00;
export const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);
export const NFT_BASE_URL =
  "https://s.getgems.io/nft-staging/c/628f6ab8077060a7a8d52d63/";

export interface JettonContent {
  uri?: string;
  name: string;
  description: string;
  symbol: string;
  image?: string;
  decimals?: string;
  amount_style?: string;
  render_type?: string;
}

function bufferToChunks(buff: Buffer, chunkSize: number) {
  const chunks: Buffer[] = [];
  while (buff.byteLength > 0) {
    chunks.push(buff.subarray(0, chunkSize));
    buff = buff.subarray(chunkSize);
  }
  return chunks;
}

function makeSnakeCell(data: Buffer) {
  const chunks = bufferToChunks(data, CELL_MAX_SIZE_BYTES);
  const b = chunks.reduceRight((curCell, chunk, index) => {
    if (index === 0) {
      curCell.storeInt(SNAKE_PREFIX, 8);
    }
    curCell.storeBuffer(chunk);
    if (index > 0) {
      const cell = curCell.endCell();
      return beginCell().storeRef(cell);
    } else {
      return curCell;
    }
  }, beginCell());
  return b.endCell();
}

const toKey = (key: string) => {
  return BigInt(`0x${sha256_sync(key).toString("hex")}`);
};

// data can be either jetton content dict or NFT item index
export function buildJettonContent(data: JettonContent): Cell {
  const dict = Dictionary.empty(
    Dictionary.Keys.BigUint(256),
    Dictionary.Values.Cell(),
  );

  Object.entries(data).forEach(([key, value]) => {
    if (!!value) {
      dict.set(toKey(key), makeSnakeCell(Buffer.from(value, "utf8")));
    }
  });

  return beginCell()
    .storeInt(ONCHAIN_CONTENT_PREFIX, 8)
    .storeDict(dict)
    .endCell();
}

export function buildNFTCollectionContent(
  base_url: string = NFT_BASE_URL,
): Cell {
  return beginCell()
    .storeInt(OFFCHAIN_TAG, 8)
    .storeStringRefTail(base_url)
    .endCell();
}
