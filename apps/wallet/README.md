<p align="center">
<img src="https://raw.githubusercontent.com/canccevik/epimon/main/.github/assets/logo.png" alt="Epimon Logo" width="100" />
</p>

<h3 align="center">Wallet</h3>

<p align="center">The wallet extension of the Epimon.</p>

## Installation

1. Install NPM packages

   ```sh
   npm install
   ```

2. Prepare the `.env` file

   ```JS
    VITE_API_URL=http://localhost:3003/api
   ```

3. Buid the project

   ```sh
   npm run build
   ```

4. Install the extension in browser

   - Start by launching your browser.

   - Locate and click on the three-dot icon positioned at the top-right corner to reveal the dropdown menu, then select "Settings."

   - Within the Settings page, navigate to and click on the "Extensions" option found on the left-hand side.

   - Ensure the "Developer mode" toggle, usually positioned at the top-right corner, is switched on.

   - Subsequently, click on the "Load unpacked" button, typically visible towards the top-left or top-center of the Extensions page.

   - A file dialog will appear. Here, navigate to the `dist` folder that you've previously built with your project. Once inside, select all the files related to your extension and then click "Open."

   - Congratulations! Your extension should now be successfully installed and activated in your browser, ready for use.

## Running in development mode

```bash
# development
$ npm run start:dev
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
