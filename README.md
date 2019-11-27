# Blockchain explorer

## PrivateSky blockchain-explorer

### Author: SpaceGiant

---

<br/>

# Overview

This is a web application that is used to explore the transactions from PrivateSky.

### Frontend application

- React (16.3.2) application (starting from [react-slingshot](https://github.com/coryhouse/react-slingshot)) that is using the following main libraries:
  - react-router-dom - route handling
  - redux + redux-thunk - store handling
  - material-ui - view components
  - react-intl - handles translations
- Testing:
  - eslint + prettier - static analysis
  - jest - test runner (unit/integration tests)

### Backend API

- Node.js application that is using the Express.js web application framework

# Installation

To install the frontend packages the following command must be run (from the root of the project):

```
yarn install
```

To install the backend packages the following command must be run (from the root of the project):

```
cd api
yarn install
```

# Configuration

## Frontend application

- Running in development mode doesn't require any special configuration

## Backend application

- Running in development mode will require the creation of a file called **.env** inside the **api** folder (because the .env file should never be committed to git).
  - a sample file (**.env.sample**) is provided in the same **api** folder that contains the required structured for **.env** as well as explanations for each configuration
  - for simplicity, here is a sample of what the **.env** file should look like:

```
#server config
SERVER_PORT=3090
PUBLIC_FOLDER_PATH=public
BODY_PARSER_LIMIT=5mb
ALLOW_DETAILED_ERROR_MESSAGES=[y/n]
DISABLE_CONSOLE_LOGGING=[y/n]

CURRENT_VERSION_FILE_PATH=samples/currentVersion
TRANSACTIONS_LOG_FILE_PATH=samples/transactionsLog
```

# Running the application

- To run the application in development mode, the following command must be run:

```
yarn start
```

# Testing the application

- To run the frontend unit/integration tests, the following command must be run:

```
yarn test
```
