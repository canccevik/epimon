<p align="center">
<img src="https://raw.githubusercontent.com/canccevik/epimon/main/.github/assets/logo.png" alt="Epimon Logo" width="100" />
</p>

<h3 align="center">Blockchain</h3>

<p align="center">The core blockchain implementation of the Epimon.</p>

## Installation

1. Install NPM packages

   ```sh
   npm install
   ```

2. Prepare the `.env` file

   ```JS
   NODE_ENV= development
   PORT= 3001
   GLOBAL_PREFIX= api
   DATABASE_URI= mongodb://localhost:27017/epimon
   ROOT_NODE_URI= http://localhost:3001/api
   OWNER_WALLET_SECRET_PHRASE= ENTER-OWNER-SECRET-PHRASE
   OWNER_WALLET_INITIAL_BALANCE= 10000
   MINING_REWARD= 100
   DIFFICULTY= 4

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

## Documentation

```bash
# open on the web browser
$ http://localhost:3001/api
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
