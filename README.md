build-plus-plus
===============

[![Build Status](https://travis-ci.org/karadalex/build-plus-plus.svg?branch=main)](https://travis-ci.org/karadalex/build-plus-plus)

A service for incrementing build numbers for automated CI/CD pipelines. 

## Table of Contents

1. [Run in Server mode (cli)](#run-in-server-mode)
2. [Run in Standalone mode (cli)](#run-in-standalone-mode)
3. [Contributing](#contributing)
4. [Credits](#credits)
5. [License](#license)


## Run in Server mode

Run as a cli
```
npm install -g build-plus-pllus
buildpp
```

Run it with docker
```
docker build . -t buildpp
docker run -d -p 8000:8000 buildpp
```
or with docker-compose
```
docker-compose up
```

## Run in Standalone mode

Install the nodejs module `npm install --save build-plus-plus`
```js
const buildpp = require("build-plus-plus")
buildpp.getOrCreateProjectVersion("test", (data) => {
  console.log(data)
})
```


## Contributing

To test in server mode, run inside this repository
```
npm link ./
```
and then run `buildpp`.
To uninstall it , run inside this repository
```
npm unlink ./
```


## Credits

This project was inspired by https://increment.build/ by [JonnyBurger](https://github.com/JonnyBurger/)


## License

MIT License, Copyright (c) 2020 Alex Karadimos