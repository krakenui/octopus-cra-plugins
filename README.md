# octopus-cra-plugins

[![NPM version][npm-image]][npm-url] [![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/octopus-cra-plugins.svg?style=flat-square
[npm-url]: http://npmjs.org/package/octopus-cra-plugins
[download-image]: https://img.shields.io/npm/dm/octopus-cra-plugins.svg?style=flat-square
[download-url]: https://npmjs.org/package/octopus-cra-plugins

## Install

[![octopus-cra-plugins](https://nodei.co/npm/octopus-cra-plugins.png)](https://npmjs.org/package/octopus-cra-plugins)

```
npm install --save octopus-cra-plugins
```

## Features

```
- Customize override environments
- Support nightly environments
- Support staging environments
```

## Install

- Install octopus-cra-plugins

```
npm install octopus-cra-plugins
```

## How it work

#### Override process env

- Declare override:

```
import { overrideProcessEnv } from "octopus-cra-plugins";

overrideProcessEnv(workDir, true);
```

- Env file `.env.nightly`

- Script:

```
    npm run react-scripts build --cra-env nightly
```

#### Options

| #   | Name    | Description                                         | Default                   |
| --- | ------- | --------------------------------------------------- | ------------------------- |
| 1   | workDir | Working directory path, environments directory path | Process working directory |
| 2   | replace | Is hard replace properties, else soft merge         | false                     |

## LICENSE

MIT
