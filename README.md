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
yarn start
```

A message will prompt up asking for the module type, you can choose from **[child module]** and **[base module]**.
[base module] is the microapp base, and is the core for the overall microapps. This is basically the first step you will need to approach.

## Adding shared libraries

Shared libraries are used to enhance performance by sharing common modules in the browser through systemjs-importmaps. Micro App CLI **[base module]** manages the dependencies in a single file located in _[library/importmap.json]_. The minimum dependencies required for **[base module]** is **[react, react-dom]**, which are core dependencies for most of the react-\* related modules, e.x [react-redux, react-router, etc.]. The generated [base module] starter project already shipped with some common libraries for you, and you can extend this configuration later on as your project matures in the future.

## Inject Micro App child module into microapp base module

Adding child module to base module is as simple as adding shared libraries. You will just need to edit _[library/importmap.json]_ file.
e.g. Saying you have created 2 projects, one base module (named my-base-module), one child module (named my-child-module). Edit _[importmap.json]_, add

```json
{
  imports: {
    @microapp/my-child-module: [http://localhost:PORT/main.js]
    @microapp/my-base-module: %PUBLIC_URL%/main.js,
  }
}
```

Notice: http://localhost:PORT/main.js is the my-child-module webpack dev server PORT.

After having updated importmap.json, you can import the child module in your base module just like the normal ES6 import.

```javascript
import MyChildModule from "@microapp/my-child-module";
...
// Add to your
<Router>
  ...
  <Route from="/my-child-module" component={MyChildModule}> />
  ...
</Router>
```

or lazily loaded via

```javascript
const MyChildModule = React.lazy(() => System.import("@microapp/my-child-module"));
// Add to your
<Router>
  <Suspense fallback={<Loading />}>
    ...
    <Route from="/my-child-module" component={MyChildModule}> />
    ...
  </Suspense>
</Router>
```

## License

Micro App CLI is open source software licensed as MIT.
