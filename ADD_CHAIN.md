## Documentation on How to Add a New Chain to Validator

This document outlines the steps to add a new chain to the XP Validator.

Step 0 - Create a directory inside the handlers with the chain name and add a new index.ts file to it.

Step 1 - Implement the type [THandler] for the chain. Look at [src/handler/evm/index.ts](src/handler/evm/index.ts) for example.

Step 2 - Add a Configuration function for the chain in the [src/deps.ts](src/deps.ts) file as present for other chains in the same file.

Step 3 - Add the chain to [configDeps()](src/deps.ts) function in [deps.ts](src/deps.ts) as a new key with the chain name.

Step 4 - Add the THandler for that specific chain in the chains array present in [src/index.ts](src/index.ts).

Step 5 - Add The PrivateKey, Address, Public Key to the [secrets.example.json](secrets.example.json).
