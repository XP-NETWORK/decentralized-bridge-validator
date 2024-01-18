export const CollectionFactoryCode: {
    __type: 'CollectionFactoryCode';
    protocol: string;
    code: object[];
} = {
    __type: 'CollectionFactoryCode',
    protocol: 'PtEdo2ZkT9oKpimTah6x2embF25oss54njMuPzkJTEi5RqfdZFA',
    code: JSON.parse(
        `[{"prim":"parameter","args":[{"prim":"or","args":[{"prim":"or","annots":["%deploy_nft"],"args":[{"prim":"address","annots":["%addr"]},{"prim":"string","annots":["%str"]}]},{"prim":"address","annots":["%set_owner"]}]}]},{"prim":"storage","args":[{"prim":"pair","args":[{"prim":"option","annots":["%owner"],"args":[{"prim":"address"}]},{"prim":"map","annots":["%collection_to_store"],"args":[{"prim":"or","args":[{"prim":"address","annots":["%addr"]},{"prim":"string","annots":["%str"]}]},{"prim":"address"}]}]}]},{"prim":"code","args":[[{"prim":"UNPAIR"},{"prim":"IF_LEFT","args":[[{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"True"}]}],[{"prim":"DROP"},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"False"}]}]]},{"prim":"IF","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"Contract is not initialized"}]},{"prim":"FAILWITH"}],[]]},{"prim":"SENDER"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CAR"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"option is None"}]},{"prim":"FAILWITH"}],[]]},{"prim":"COMPARE"},{"prim":"NEQ"},{"prim":"IF","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"Only owner can call this function"}]},{"prim":"FAILWITH"}],[]]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"option is None"}]},{"prim":"FAILWITH"}],[]]},{"prim":"EMPTY_BIG_MAP","args":[{"prim":"string"},{"prim":"bytes"}]},{"prim":"EMPTY_BIG_MAP","args":[{"prim":"nat"},{"prim":"pair","args":[{"prim":"nat"},{"prim":"map","args":[{"prim":"string"},{"prim":"bytes"}]}]}]},{"prim":"EMPTY_BIG_MAP","args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"address"}]},{"prim":"set","args":[{"prim":"nat"}]}]},{"prim":"EMPTY_BIG_MAP","args":[{"prim":"nat"},{"prim":"address"}]},{"prim":"PAIR","args":[{"int":"5"}]},{"prim":"PUSH","args":[{"prim":"mutez"},{"int":"0"}]},{"prim":"NONE","args":[{"prim":"key_hash"}]},{"prim":"CREATE_CONTRACT","args":[[{"prim":"parameter","args":[{"prim":"or","args":[{"prim":"list","annots":["%update_operators"],"args":[{"prim":"or","args":[{"prim":"pair","annots":["%add_operator"],"args":[{"prim":"address","annots":["%owner"]},{"prim":"address","annots":["%operator"]},{"prim":"nat","annots":["%token_id"]}]},{"prim":"pair","annots":["%remove_operator"],"args":[{"prim":"address","annots":["%owner"]},{"prim":"address","annots":["%operator"]},{"prim":"nat","annots":["%token_id"]}]}]}]},{"prim":"or","args":[{"prim":"list","annots":["%mint"],"args":[{"prim":"pair","args":[{"prim":"nat","annots":["%token_id"]},{"prim":"string","annots":["%token_uri"]},{"prim":"address","annots":["%to"]},{"prim":"nat","annots":["%amt"]}]}]},{"prim":"or","args":[{"prim":"pair","annots":["%balance_of"],"args":[{"prim":"list","annots":["%requests"],"args":[{"prim":"pair","args":[{"prim":"address","annots":["%owner"]},{"prim":"nat","annots":["%token_id"]}]}]},{"prim":"contract","annots":["%callback"],"args":[{"prim":"list","args":[{"prim":"pair","args":[{"prim":"pair","annots":["%request"],"args":[{"prim":"address","annots":["%owner"]},{"prim":"nat","annots":["%token_id"]}]},{"prim":"nat","annots":["%balance"]}]}]}]}]},{"prim":"list","annots":["%transfer"],"args":[{"prim":"pair","args":[{"prim":"address","annots":["%from_"]},{"prim":"list","annots":["%txs"],"args":[{"prim":"pair","args":[{"prim":"address","annots":["%to_"]},{"prim":"nat","annots":["%token_id"]},{"prim":"nat","annots":["%amount"]}]}]}]}]}]}]}]}]},{"prim":"storage","args":[{"prim":"pair","args":[{"prim":"big_map","annots":["%ledger"],"args":[{"prim":"nat"},{"prim":"address"}]},{"prim":"big_map","annots":["%operators"],"args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"address"}]},{"prim":"set","args":[{"prim":"nat"}]}]},{"prim":"big_map","annots":["%token_metadata"],"args":[{"prim":"nat"},{"prim":"pair","args":[{"prim":"nat","annots":["%token_id"]},{"prim":"map","annots":["%token_info"],"args":[{"prim":"string"},{"prim":"bytes"}]}]}]},{"prim":"big_map","annots":["%metadata"],"args":[{"prim":"string"},{"prim":"bytes"}]},{"prim":"address","annots":["%admin"]}]}]},{"prim":"code","args":[[{"prim":"LAMBDA","args":[{"prim":"address"},{"prim":"unit"},[{"prim":"PUSH","args":[{"prim":"string"},{"string":"The sender can only manage operators for his own token"}]},{"prim":"SENDER"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"DROP"},{"prim":"UNIT"}],[{"prim":"FAILWITH"}]]}]]},{"prim":"LAMBDA","args":[{"prim":"pair","args":[{"prim":"big_map","args":[{"prim":"nat"},{"prim":"pair","args":[{"prim":"nat"},{"prim":"map","args":[{"prim":"string"},{"prim":"bytes"}]}]}]},{"prim":"nat"}]},{"prim":"unit"},[{"prim":"UNPAIR"},{"prim":"SWAP"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"FA2_TOKEN_UNDEFINED"}]},{"prim":"FAILWITH"}],[{"prim":"DROP"}]]},{"prim":"UNIT"}]]},{"prim":"LAMBDA","args":[{"prim":"pair","args":[{"prim":"big_map","args":[{"prim":"nat"},{"prim":"address"}]},{"prim":"nat"},{"prim":"address"}]},{"prim":"bool"},[{"prim":"UNPAIR","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"option is None"}]},{"prim":"FAILWITH"}],[]]},{"prim":"COMPARE"},{"prim":"EQ"}]]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"UNPAIR"},{"prim":"IF_LEFT","args":[[{"prim":"DIG","args":[{"int":"2"}]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"DROP","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"GET","args":[{"int":"3"}]},{"prim":"LAMBDA","args":[{"prim":"pair","args":[{"prim":"lambda","args":[{"prim":"address"},{"prim":"unit"}]},{"prim":"pair","args":[{"prim":"big_map","args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"address"}]},{"prim":"set","args":[{"prim":"nat"}]}]},{"prim":"or","args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"address"},{"prim":"nat"}]},{"prim":"pair","args":[{"prim":"address"},{"prim":"address"},{"prim":"nat"}]}]}]}]},{"prim":"big_map","args":[{"prim":"pair","args":[{"prim":"address"},{"prim":"address"}]},{"prim":"set","args":[{"prim":"nat"}]}]},[{"prim":"UNPAIR"},{"prim":"SWAP"},{"prim":"UNPAIR"},{"prim":"SWAP"},{"prim":"IF_LEFT","args":[[{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"SWAP"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"DROP","args":[{"int":"4"}]}],[{"prim":"DUP"},{"prim":"DIG","args":[{"int":"5"}]},{"prim":"SWAP"},{"prim":"EXEC"},{"prim":"DROP"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"PAIR"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"EMPTY_SET","args":[{"prim":"nat"}]}],[]]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"True"}]},{"prim":"SWAP"},{"prim":"UPDATE"},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"SOME"},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"PAIR"},{"prim":"UPDATE"}]]}],[{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"SWAP"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"DROP","args":[{"int":"4"}]}],[{"prim":"DUP"},{"prim":"DIG","args":[{"int":"5"}]},{"prim":"SWAP"},{"prim":"EXEC"},{"prim":"DROP"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"PAIR"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"DIG","args":[{"int":"3"}]},{"prim":"DROP"},{"prim":"NONE","args":[{"prim":"set","args":[{"prim":"nat"}]}]}],[{"prim":"DIG","args":[{"int":"4"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"False"}]},{"prim":"SWAP"},{"prim":"UPDATE"},{"prim":"PUSH","args":[{"prim":"nat"},{"int":"0"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"SIZE"},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"DROP"},{"prim":"NONE","args":[{"prim":"set","args":[{"prim":"nat"}]}]}],[{"prim":"SOME"}]]}]]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"PAIR"},{"prim":"UPDATE"}]]}]]}]]},{"prim":"DUP","args":[{"int":"5"}]},{"prim":"APPLY"},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"DROP"},{"prim":"SWAP"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"ITER","args":[[{"prim":"SWAP"},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"EXEC"}]]},{"prim":"SWAP"},{"prim":"DROP"},{"prim":"UPDATE","args":[{"int":"3"}]},{"prim":"NIL","args":[{"prim":"operation"}]}],[{"prim":"DIG","args":[{"int":"4"}]},{"prim":"DROP"},{"prim":"IF_LEFT","args":[[{"prim":"DIG","args":[{"int":"2"}]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"DROP","args":[{"int":"2"}]},{"prim":"ITER","args":[[{"prim":"SWAP"},{"prim":"PUSH","args":[{"prim":"string"},{"string":"Mint Can Only Be Called By Owner"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"GET","args":[{"int":"8"}]},{"prim":"SENDER"},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"DROP"}],[{"prim":"FAILWITH"}]]},{"prim":"DUP"},{"prim":"GET","args":[{"int":"5"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CAR"},{"prim":"GET"},{"prim":"IF_NONE","args":[[],[{"prim":"DROP"},{"prim":"PUSH","args":[{"prim":"string"},{"string":"Token ID Already Exists"}]},{"prim":"FAILWITH"}]]},{"prim":"EMPTY_MAP","args":[{"prim":"string"},{"prim":"bytes"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"3"}]},{"prim":"PACK"},{"prim":"PUSH","args":[{"prim":"string"},{"string":""}]},{"prim":"SWAP"},{"prim":"SOME"},{"prim":"SWAP"},{"prim":"UPDATE"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"GET","args":[{"int":"5"}]},{"prim":"SWAP"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CAR"},{"prim":"PAIR"},{"prim":"SOME"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"UNPAIR","args":[{"int":"3"}]},{"prim":"UPDATE"},{"prim":"UPDATE","args":[{"int":"5"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"GET","args":[{"int":"5"}]},{"prim":"DUP","args":[{"int":"5"}]},{"prim":"CAR"},{"prim":"SWAP"},{"prim":"SOME"},{"prim":"SWAP"},{"prim":"UPDATE"},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"SWAP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"EMPTY_SET","args":[{"prim":"nat"}]},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CAR"},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"True"}]},{"prim":"SWAP"},{"prim":"UPDATE"},{"prim":"SOME"},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"GET","args":[{"int":"5"}]},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"GET","args":[{"int":"5"}]},{"prim":"PAIR"},{"prim":"UPDATE"},{"prim":"UPDATE","args":[{"int":"3"}]}]]},{"prim":"NIL","args":[{"prim":"operation"}]}],[{"prim":"IF_LEFT","args":[[{"prim":"UNPAIR"},{"prim":"MAP","args":[[{"prim":"DUP"},{"prim":"UNPAIR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"6"}]},{"prim":"GET","args":[{"int":"5"}]},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"8"}]},{"prim":"SWAP"},{"prim":"EXEC"},{"prim":"DROP"},{"prim":"PUSH","args":[{"prim":"nat"},{"int":"0"}]},{"prim":"SWAP"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"6"}]},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"6"}]},{"prim":"SWAP"},{"prim":"EXEC"},{"prim":"IF","args":[[{"prim":"DROP"},{"prim":"PUSH","args":[{"prim":"nat"},{"int":"1"}]}],[]]},{"prim":"SWAP"},{"prim":"PAIR"}]]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"DIG","args":[{"int":"4"}]},{"prim":"DROP","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"PUSH","args":[{"prim":"mutez"},{"int":"0"}]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"TRANSFER_TOKENS"},{"prim":"SWAP"},{"prim":"NIL","args":[{"prim":"operation"}]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"CONS"}],[{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"SWAP"},{"prim":"ITER","args":[[{"prim":"UNPAIR"},{"prim":"DUG","args":[{"int":"2"}]},{"prim":"ITER","args":[[{"prim":"UNPAIR","args":[{"int":"3"}]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"DROP"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"6"}]},{"prim":"GET","args":[{"int":"5"}]},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"8"}]},{"prim":"SWAP"},{"prim":"EXEC"},{"prim":"DROP"},{"prim":"SENDER"},{"prim":"DUP","args":[{"int":"5"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"COMPARE"},{"prim":"NEQ"},{"prim":"IF","args":[[{"prim":"DUP","args":[{"int":"6"}]},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"DUP","args":[{"int":"6"}]},{"prim":"PAIR"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"EMPTY_SET","args":[{"prim":"nat"}]}],[]]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"MEM"},{"prim":"NOT"},{"prim":"IF","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"FA2_NOT_OPERATOR"}]},{"prim":"FAILWITH"}],[]]}],[{"prim":"DROP"}]]},{"prim":"PUSH","args":[{"prim":"string"},{"string":"FA2_INSUFFICIENT_BALANCE"}]},{"prim":"DUP","args":[{"int":"5"}]},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"DUP","args":[{"int":"6"}]},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"8"}]},{"prim":"SWAP"},{"prim":"EXEC"},{"prim":"IF","args":[[{"prim":"DROP"}],[{"prim":"FAILWITH"}]]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"SOME"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"UPDATE"}]]},{"prim":"SWAP"},{"prim":"DROP"}]]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"DROP","args":[{"int":"2"}]},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"NIL","args":[{"prim":"operation"}]}]]}]]}]]},{"prim":"PAIR"}]]},{"prim":"view","args":[{"string":"get_balance"},{"prim":"pair","args":[{"prim":"address"},{"prim":"nat"}]},{"prim":"nat"},[{"prim":"UNPAIR"},{"prim":"UNPAIR"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"5"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"FA2_TOKEN_UNDEFINED"}]},{"prim":"FAILWITH"}],[{"prim":"DROP"}]]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"option is None"}]},{"prim":"FAILWITH"}],[]]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"PUSH","args":[{"prim":"nat"},{"int":"1"}]}],[{"prim":"PUSH","args":[{"prim":"nat"},{"int":"0"}]}]]}]]},{"prim":"view","args":[{"string":"owner_of"},{"prim":"nat"},{"prim":"address"},[{"prim":"UNPAIR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"GET","args":[{"int":"5"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"FA2_TOKEN_UNDEFINED"}]},{"prim":"FAILWITH"}],[{"prim":"DROP"}]]},{"prim":"SWAP"},{"prim":"CAR"},{"prim":"SWAP"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"MAP FIND"}]},{"prim":"FAILWITH"}],[]]}]]},{"prim":"view","args":[{"string":"total_supply"},{"prim":"nat"},{"prim":"nat"},[{"prim":"UNPAIR"},{"prim":"SWAP"},{"prim":"GET","args":[{"int":"5"}]},{"prim":"SWAP"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"FA2_TOKEN_UNDEFINED"}]},{"prim":"FAILWITH"}],[{"prim":"DROP"}]]},{"prim":"PUSH","args":[{"prim":"nat"},{"int":"1"}]}]]},{"prim":"view","args":[{"string":"all_tokens"},{"prim":"unit"},{"prim":"set","args":[{"prim":"nat"}]},[{"prim":"DROP"},{"prim":"PUSH","args":[{"prim":"string"},{"string":"Feature not available. Maybe use an indexer instead"}]},{"prim":"FAILWITH"}]]},{"prim":"view","args":[{"string":"is_operator"},{"prim":"pair","args":[{"prim":"address","annots":["%owner"]},{"prim":"address","annots":["%operator"]},{"prim":"nat","annots":["%token_id"]}]},{"prim":"bool"},[{"prim":"UNPAIR"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"GET","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"3"}]},{"prim":"DUP","args":[{"int":"4"}]},{"prim":"CAR"},{"prim":"PAIR"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"EMPTY_SET","args":[{"prim":"nat"}]}],[]]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"MEM"},{"prim":"OR"}]]},{"prim":"view","args":[{"string":"token_metadata"},{"prim":"nat"},{"prim":"pair","args":[{"prim":"nat","annots":["%token_id"]},{"prim":"map","annots":["%token_info"],"args":[{"prim":"string"},{"prim":"bytes"}]}]},[{"prim":"UNPAIR"},{"prim":"SWAP"},{"prim":"GET","args":[{"int":"5"}]},{"prim":"SWAP"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"FA2_TOKEN_UNDEFINED"}]},{"prim":"FAILWITH"}],[]]}]]}]]},{"prim":"PAIR"},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"CDR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CDR"},{"prim":"DIG","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"SOME"},{"prim":"SWAP"},{"prim":"UPDATE"},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"SWAP"},{"prim":"UPDATE","args":[{"int":"2"}]},{"prim":"NIL","args":[{"prim":"operation"}]},{"prim":"DIG","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"CONS"}],[{"prim":"DUP","args":[{"int":"2"}]},{"prim":"CAR"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"False"}]}],[{"prim":"DROP"},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"True"}]}]]},{"prim":"IF","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"Owner already set"}]},{"prim":"FAILWITH"}],[]]},{"prim":"SOME"},{"prim":"UPDATE","args":[{"int":"1"}]},{"prim":"NIL","args":[{"prim":"operation"}]}]]},{"prim":"PAIR"}]]},{"prim":"view","args":[{"string":"get_store"},{"prim":"or","args":[{"prim":"address","annots":["%addr"]},{"prim":"string","annots":["%str"]}]},{"prim":"address"},[{"prim":"UNPAIR"},{"prim":"SWAP"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"GET"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"MAP FIND"}]},{"prim":"FAILWITH"}],[]]}]]},{"prim":"view","args":[{"string":"get_owner"},{"prim":"unit"},{"prim":"address"},[{"prim":"CDR"},{"prim":"CAR"},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"option is None"}]},{"prim":"FAILWITH"}],[]]}]]}]`,
    ),
};
