## Adding a New Chain to Validator

This guide details the steps required to add a new chain to the XP Validator for the decentralized bridge project.

### Step 1: Implement THandler Type

1. Create a new directory structure for the chain using the provided command:
   ```shell
   CHAIN_NAME='YourChainNameHere' && \
   mkdir -p src/handler/${CHAIN_NAME}/utils && \
   touch src/handler/${CHAIN_NAME}/{index.ts,utils/{getAddSelfAsValidator.ts,getGenerateWallet.ts,getListenForLockEvents.ts,getNftData.ts,getSelfIsValidator.ts,getSignClaimData.ts,index.ts,log.ts}}
   ```
    ### Implement the following functions in the newly created files:

    1. `getAddSelfAsValidator.ts`: Returns a function allowing the running node to add itself as a validator in the bridge.
    2. `getGenerateWallet.ts`: Returns a function to generate wallet keys for the chain.
    3. `getListenForLockEvents.ts`: Returns a function to listen to blockchain events.
    4. `getNftData.ts`: Returns a function to retrieve metadata for a specific NFT or NFT collection.
    5. `getSelfIsValidator.ts`: Returns a function to check if the node is currently added as a validator.
    6. `getSignClaimData.ts`: Returns a function to sign NFT details.
    7. `index.ts`: Exports all utility functions.
    8. `log.ts`: Returns a function for specific chain logging.

### Step 2: Add Configuration Function

Add a configuration function for the chain in the `src/deps.ts` file similar to other chains in the same file.

### Step 3: Update Dependencies

Add the chain to the `configDeps()` function in `src/deps.ts` as a new key with the chain name.

### Step 5: Update Secrets

add chain's secret key pattern in `secrets.example.json` file.
