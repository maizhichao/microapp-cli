# Micro App CLI

Create React Microfrontend App (AntD, Redux) with no build configuration.

## Overview

**[microapp-cli]** is a toolset for bringing up multiple React microapps in a frontend application.
The CLI allows you to setup base module as well as the child module[s] for you microfrontend App.

## Installation

### yarn

```sh
yarn global add microapp-cli
```

### npm

```sh
npm install microapp-cli -g
```

## Creating an App

```sh
npx create-microapp [my-microapp]
cd my-microapp
yarn run dev
```

A message will prompt up asking for the module type, you can choose from **[child module]** and **[base module]**.
[base module] is the microapp base, and is the core for the overall microapps. This is basically the first step you will need to approach.

## Inject Micro App child module into microapp base module

## Adding shared libraries

Shared libraries are used to enhance performance by sharing common modules in the browser through systemjs-importmaps. Micro App CLI **[base module]** manages the dependencies in a single file located in _[library/importmap.json]_. The minimum dependencies required for **[base module]** is **[react, react-dom]**, which are core dependencies for most of the react-\* related modules, e.x [react-redux, react-router, etc.]. The generated [base module] starter project already shipped with some common libraries for you, and you can extend this configuration later on as your project matures in the future.

## License

Micro App CLI is open source software licensed as MIT.
