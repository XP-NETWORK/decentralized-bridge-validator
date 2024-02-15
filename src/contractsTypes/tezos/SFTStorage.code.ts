export const SFTStorageCode: {
    __type: 'SFTStorageCode';
    protocol: string;
    code: object[];
} = {
    __type: 'SFTStorageCode',
    protocol: 'PtEdo2ZkT9oKpimTah6x2embF25oss54njMuPzkJTEi5RqfdZFA',
    code: JSON.parse(
        `[{"prim":"parameter","args":[{"prim":"or","args":[{"prim":"pair","annots":["%unlock_token"],"args":[{"prim":"nat","annots":["%token_id"]},{"prim":"address","annots":["%to"]},{"prim":"nat","annots":["%amt"]}]},{"prim":"pair","annots":["%deposit_token"],"args":[{"prim":"nat","annots":["%token_id"]},{"prim":"nat","annots":["%amt"]}]}]}]},{"prim":"storage","args":[{"prim":"pair","args":[{"prim":"address","annots":["%owner"]},{"prim":"address","annots":["%collection"]}]}]},{"prim":"code","args":[[{"prim":"LAMBDA","args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"address"},{"prim":"nat"},{"prim":"nat"},{"prim":"address"},{"prim":"address"}]},{"prim":"operation"},[{"prim":"UNPAIR","args":[{"int":"5"}]},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"CDR"},{"prim":"CONTRACT","annots":["%transfer"],"args":[{"prim":"list","args":[{"prim":"pair","args":[{"prim":"address","annots":["%from_"]},{"prim":"list","annots":["%txs"],"args":[{"prim":"pair","args":[{"prim":"address","annots":["%to_"]},{"prim":"nat","annots":["%token_id"]},{"prim":"nat","annots":["%amount"]}]}]}]}]}]},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"bad address for get_entrypoint"}]},{"prim":"FAILWITH"}],[]]},{"prim":"PUSH","args":[{"prim":"mutez"},{"int":"0"}]},{"prim":"NIL","args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"list","args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"nat"},{"prim":"nat"}]}]}]}]},{"prim":"NIL","args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"nat"},{"prim":"nat"}]}]},{"prim":"DIG","args":[{"int":"7"}]},{"prim":"DIG","args":[{"int":"7"}]},{"prim":"DIG","args":[{"int":"7"}]},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"CONS"},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"PAIR"},{"prim":"CONS"},{"prim":"TRANSFER_TOKENS"}]]},{"prim":"SWAP"},{"prim":"UNPAIR"},{"prim":"IF_LEFT","args":[[{"prim":"SELF_ADDRESS"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CAR"},{"prim":"SENDER"},{"prim":"COMPARE"},{"prim":"NEQ"},{"prim":"IF","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"Cannot perform this function since you are not the owner."}]},{"prim":"FAILWITH"}],[]]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CAR"},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"GET","args":[{"int":"3"}]},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"PAIR","args":[{"int":"5"}]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"EXEC"}],[{"prim":"SELF_ADDRESS"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CDR"},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"CAR"},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"SOURCE"},{"prim":"PAIR","args":[{"int":"5"}]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"EXEC"}]]},{"prim":"SWAP"},{"prim":"NIL","args":[{"prim":"operation"}]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"CONS"},{"prim":"PAIR"}]]},{"prim":"view","args":[{"string":"get_collection_address"},{"prim":"unit"},{"prim":"address"},[{"prim":"CDR"},{"prim":"CDR"}]]},{"prim":"view","args":[{"string":"get_owner"},{"prim":"unit"},{"prim":"address"},[{"prim":"CDR"},{"prim":"CDR"}]]}]`,
    ),
};