# Replacement VLC web interface

This is a personal and not finished project. It tries to create a React interface with Typescript to replace the default one.

## How to run

VLC needs to have the web interface enabled to allow calls to the API. Unfortunately VLC does not manage CORS so all requests have to be proxied. For that the command `yarn proxy` from `package.json` will help, replacing the `proxyUrl` in the command to point to VLC.

Rename `.env.template` and set the VLC password, the `VLC_HOST` is already set to the proxy's default.

Run with `yarn start` and open in your favourite browser.

## TODO
 * Refactor some VLC context status to reduce API calls
 * Make UI properly adapt for small screens
 * Store interface configuration to LocalStorage
 * Create SVGs for buttons
 * Many other improvements