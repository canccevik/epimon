<p align="center">
<img src="https://raw.githubusercontent.com/canccevik/epimon/main/.github/assets/logo.png" alt="Epimon Logo" width="100" />
</p>

<h3 align="center">Node</h3>

<p align="center">The node project of the Epimon.</p>

## Installation

1. Install NPM packages

   ```sh
   npm install
   ```

2. Prepare the `.env` file

   ```JS
    PORT=3004
    MINING_WALLET_SECRET_PHRASE= ENTER-MINING-SECRET-PHRASE
    ROOT_NODE_URI=http://localhost:3001/api
    ROOT_SOCKET_URI=ws://localhost:3001
    LOCAL_API_URI=http://localhost:3001/api
   ```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Contributing

1. Fork this repository.
2. Create a new branch with feature name.
3. Create your feature.
4. Commit and set commit message with feature name.
5. Push your code to your fork repository.
6. Create pull request.

## License

Epimon is [MIT licensed](https://github.com/canccevik/epimon/blob/main/LICENSE).
