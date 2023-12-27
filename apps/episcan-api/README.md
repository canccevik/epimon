<p align="center">
<img src="https://raw.githubusercontent.com/canccevik/epimon/main/.github/assets/logo.png" alt="Epimon Logo" width="100" />
</p>

<h3 align="center">Episcan API</h3>

<p align="center">The API project of the Episcan project.</p>

## Installation

1. Install NPM packages

   ```sh
   npm install
   ```

2. Prepare the `.env` file

   ```JS
   NODE_ENV=development
   PORT=3003
   GLOBAL_PREFIX=api
   ROOT_NODE_URI=http://localhost:3001/api
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
$ http://localhost:3003/api
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
