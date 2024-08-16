# Stage 1: Build
FROM node:18.12.1 AS build

RUN apt update 
RUN apt upgrade -y
RUN apt install sqlite3 -y
RUN npm install -g node-gyp
RUN npm install -g sqlite3 --save

WORKDIR /app

# Copy package.json and yarn.lock
ADD package.json ./
ADD yarn.lock ./

RUN npm pkg delete scripts.postinstall

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production
FROM node:18.12.1 AS production

WORKDIR /app

# Copy only the built application files
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

# Declare volumes if needed
VOLUME [ "/app/validator.db" ]
VOLUME [ "/app/.env" ]
VOLUME [ "/app/secrets.json" ]

# Specify the command to run the application
CMD [ "node", "dist/index.js" ]
