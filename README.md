# Star Wars Explorer

This app is designed to make it easy to learn about star wars. Using [swapi](https://swapi.dev/), it can provide info on hundreds of characters, planets, vehicles, and even the films themselves.

The app was created using create-react-app and material-ui.  Translations were built in using i18n but are still a work in progress.

# Getting started

The first thing you will have to do is clone this repo. You will need yarn to run the app, so if you do not have it run `npm install -g yarn` to install it as a global npm package on your machine.

Once the repo is cloned and yarn is installed, `cd` into the `star-wars-explorer` directory and run `yarn` to install all the necessary dependencies.

There are two ways to run this app: running the built in webpack dev server or building and hosting it.

## Dev

Running this on a dev server is the quickest way to use it. From the root of the project, after all dependencies have been installed, run `yarn start`.  This will start up a development server at `http://localhost:5555/` that will run the app.

## Build

To test the production version of the app, `http-serve` has been included in the project.  Run `yarn start:prod` to build the project and serve the contents of the build directory at `http://localhost:8080/`
