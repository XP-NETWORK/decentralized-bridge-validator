# Decentralized NFT Bridge Project

This project aims to create a decentralized bridge that facilitates the transfer of non-fungible tokens (NFTs) between different blockchain networks. By leveraging smart contracts and blockchain interoperability, this bridge enables users to seamlessly transfer their NFTs from one chain to another.

## Features

- **Cross-Chain NFT Transfer**: Transfer NFTs between different blockchain networks.
- **Decentralized Architecture**: Utilizes decentralized technologies to ensure trustless and secure transactions.
- **Smart Contract Integration**: Integrates with smart contracts on various blockchain networks to manage NFT transfers.
- **Configurable Chain Support**: Easily add support for new blockchain networks through configurable chain implementations.
- **Automated Build and Formatting**: Streamlined development process with automated build and code formatting scripts.

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. **Clone the Repository**: 
```shell
git clone https://github.com/XP-NETWORK/decentralized-bridge-validator.git
```
2. **Install Dependencies**: 
```shell
cd decentralized-bridge-validator
yarn
```
3. **Build the Project**: 
```shell
yarn build
```
4. **Configure Secrets**: 
Update the `secrets.example.json` file with your private keys, addresses, and other sensitive information, then rename it to `secrets.json`.
5. **Running the project**: 
    
    *for dev enviroment*
    ```shell
    yarn dev
    ```
    *for prod enviroment*
    ```shell
    node dist/index.js
    ```
    Use the --testnet flag to run the project on the testnet environment.







## Project Structure

- **`src/`**: Contains the source code of the project.
    - **`contractsTypes`** Directory contaning chain specific contract types
    - **`handler/`**: Directory for chain-specific handler implementations.
        - **`ChainSpecificHandler/`**:  Chain handler.
            - **`index.ts`**: Main file for handler.
            - **`utils/`**: Utilities specific to handler.
        - **`types.ts`**: Shared types for handlers.
        - **`utils.ts`**: Utility functions shared across handlers.
    - **`persistence/`**: Directory for persistence-related 
    - **`types/`**: Directory mainly containing handler types 
    - **`config.ts`**: Configuration file.
    - **`deps.ts`**: File defining project dependencies and configurations.
    - **`index.ts`**: Entry point of the application.
    - **`mikro-orm.config.ts`**: MikroORM configuration.

## Additional Resources

- [Adding a New Chain Guide](ADD_CHAIN.md)
## Available Scripts

- **`build`**: Compiles TypeScript source code into JavaScript.
- **`format`**: Formats source code using Biome.
- **`lint`**: Lints source code for consistency and best practices.
- **`postinstall`**: Installs LeftHook for pre-commit hooks.
- **`dev`**: Builds the project and starts the development server.

## Contributing

Contributions to this project are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request. Make sure to follow the project's coding standards and guidelines.