# How to run the validator

#### There are two ways about it -

1.  **Using Docker**
    To Deploy the validator using docker, you need to have docker installed on your machine. If you don't have docker installed, you can download it from [here](https://docs.docker.com/get-docker/).

    Follow these steps to deploy the validator using docker:

    - pull the docker image from ghcr.io

    ```bash
    docker pull ghcr.io/xp-network/decentralized-bridge-validator:main
    ```

    - initialize the database and the secrets.json file

    ```bash
    touch validator.db
    touch secrets.json
    ```

    - create a .env file and add the environment variables

    ```bash
    cp .env.example .env
    ```

    - run the docker container

    ```bash
    docker run -d -v $(pwd)/secrets.json:/app/secrets.json -v $(pwd)/.env:/app/.env -v $(pwd)/validator.db:/app/validator.db ghcr.io/xp-network/decentralized-bridge-validator:main
    ```

2.  **Local Deployment**
    To deploy the validator locally, you need to have nodejs installed on your machine. If you don't have nodejs installed, you can download it from [here](https://nodejs.org/en/download/).

    Follow these steps to deploy the validator locally:

    - clone the repository

    ```bash
    git clone https://github.com/XP-NETWORK/decentralized-bridge-validator -b main validator
    ```

    - enter the directory

    ```bash
    cd validator
    ```

    - install the dependencies

    ```bash
    yarn
    ```

    - create a .env file and add the environment variables

    ```bash
    cp .env.example .env
    ```

    - start the validator

    ```bash
    yarn dev
    ```
