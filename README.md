## ETH Balances
An API to retrieve the balance of Ethereum addresses

## Requirements
- Node
- Get an Alchemy API Key in https://www.alchemy.com

### 1. Install dependencies
```
npm install
```

### 2. Run tests
If you want to run the tests execute the following command:
```
npm run test
```

### 3. Start the app
Replace `<ALCHEMY_API_KEY>` with the API key you obtained before.
```
ETHEREUM_NETWORK=mainnet ETHERS_API_KEY=<ALCHEMY_API_KEY> npm run start
```
### 4. Use Docker (optional)
You can also run this app as a Docker container:
- Add the Alchemy API key you obtained before in `local.env` file
- Build docker image
```
npm run docker:build
```
- Run docker image
```
npm run docker:start
```

### 5. Endpoint documentation
Base url: http://127.0.0.1:3000

- Get Ethereum balances
  - HTTP Method: GET
  - Path: `/eth/balances`
  - Query Parameters:
    - address: Array of Ethereum addresses
  - Example request:
    ```
    curl -X GET 'http://127.0.0.1:3000/eth/balances?address=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045&address=0xedf37e7fc70a97c5d1752cd909e0183b5bd23b27&address=0xb794f5ea0ba39494ce839613fffba74279579268'
    ```
  - Example response:
    ```
    {"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045":"935.14","0xedf37e7fc70a97c5d1752cd909e0183b5bd23b27":"0.007021","0xb794f5ea0ba39494ce839613fffba74279579268":"0.4895"}
    ```
  - In `src/routes/getEthBalances/schema.ts` you can find the endpoint in [JSON Schema]([https://json-schema.org]) format.

