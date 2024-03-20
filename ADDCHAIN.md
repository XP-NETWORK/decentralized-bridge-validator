## Adding a New Chain to Validator

This guide details the steps required to add a new chain to the XP Validator for the decentralized bridge project.

### Step 1: Implement THandler Type

1. Create a new directory structure for the chain using the provided command:
   ```shell
   CHAIN_NAME='YourChainNameHere' && \
   mkdir -p src/handler/${CHAIN_NAME}/utils && \
   touch src/handler/${CHAIN_NAME}/{index.ts,utils/{addSelfAsValidator.ts,generateWallet.ts,getBalance.ts,index.ts,listenForLockEvents.ts,log.ts,nftData.ts,selfIsValidator.ts,signClaimData.ts}}
   ```
    ### Implement the following functions in the newly created files:
    1. `utils/addSelfAsValidator.ts`: Returns a function allowing the running node to add itself as a validator in the bridge.
    2. `utils/generateWallet.ts`: Returns a function to generate wallet keys for the chain.
    3. `utils/getBalance.ts`: function to get native balance of chain
    4. `utils/listenForLockEvents.ts`: Returns a function to listen to blockchain events.
    5. `utils/log.ts`: returns a function for Chain colored logs
    6. `utils/nftData.ts`: Returns a function to retrieve metadata for a specific NFT or NFT collection.
    7. `utils/selfIsValidator.ts`: Returns a function to check if the node is currently added as a validator.
    8. `utils/signClaimData.ts`: : Returns a function to sign NFT details.
    9. `index.ts`: utilizes the created utility function to create chain handler

### Step 2: Add Configuration Function

Add a configuration function for the chain in the `src/deps.ts` file similar to other chains in the same file.

### Step 3: Update Dependencies

Add the chain to the `configDeps()` function in `src/deps.ts` as a new key with the chain name.

### Step 5: Update Secrets

add chain's secret key pattern in `secrets.example.json` file.
