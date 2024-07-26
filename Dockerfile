FROM node:18.12.1

VOLUME [ "./validator.db" ]
VOLUME [ "./.env" ]
VOLUME [ "./secrets.json" ]

RUN apt update 
RUN apt upgrade -y
RUN apt install sqlite3 -y
RUN npm install -g node-gyp
RUN npm install -g sqlite3 --save
WORKDIR /app
ADD package.json ./
ADD yarn.lock ./
RUN npm pkg delete scripts.postinstall
RUN yarn 
COPY . .
CMD [ "yarn", "dev", "--testnet"]