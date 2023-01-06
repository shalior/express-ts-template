# express-knex-typescript-template

A template that can be used to quickly scaffold a project based on express, knex and typescript.

Buzzwords ...or... What technologies does this project use:
- Docker: Linux container runtime
- PostgreSQL: SQL Database
- Knexjs: Query Builder library
- Mocha & Chai: Testing libraries
- Nodemon: Node process watcher/restarter for fast development
- TypeScript: JavaScript + Types = <3
- Pug: HTML/XML/Plain Text Template engine
- ESLint: linting library that enforces code style
- Express: HTTP server library that provides a middleware-based architecture
- BullMQ: Job Queue management library
- Redis: In-Memory store used by BullMQ
- JWT: Json Web Tokens used for authorization/authentication purposes
- dotenv: library that imports environment variables from a `.env` file
- Morgan & Winston: Logging middleware and library
- bcrypt: cryptographic library used for hashing

If you're comfortable testing it, you own it, start by reading tests in the project.

## Setup

Clone the project: 
```
git clone https://github.com/shalior/express-ts-template.git
cd express-ts-template
npm i
npm run setup
```

This app reads its environment variables from a .env file, a .env.example is provided.
The `npm run setup` command will copy the content of the .env.example and replace the SECRET variable with a cryptographically-safe random string.
Moreover, the setup script will also rename the package name in both package.json and package-lock.json

_Note: never add the .env file to git or any other version control system. It's meant to be a local file with custom configurations relative to the machine where the app runs_

## npm run ...

This template provides a set of useful scripts that can be called using the `npm run <script>` syntax.
These scripts are:
Normally you'll run these with my docker helper script (nail) like `nail npm run build`
- `knex`: knex cli wrapper that runs dotenv/config before instantiating knex
- `test`: tests the application using [mocha](https://www.npmjs.com/package/mocha) and [chai](https://www.npmjs.com/package/chai)
- `build`: runs the typescript compiler to build your application
- `prestart`: runs all the pending migration before the `start` script using the `migrate-nobuild` script
- `start`: starts a node process that will execute this package
- `dev`: starts nodemon in watch mode, this way you can edit your source ts files without having to rebuild and restart the application manually
- `lint`: runs eslint
- `lint:fix`: runs eslint with the --fix flag
- `migrate`: builds the project and runs all the migrations under src/db/migrations
- `migrate-nobuild`: runs all the migrations under src/db/migrations
- `rollback:all`: builds the project and rollbacks all the migrations under src/db/migrations
- `refresh:seed`: rollback all migration and run seeders.
- `seed`: builds the project and runs all the seeds under src/db/seeds
- `migrate-seed`: migrates and seeds, without building twice
- `setup`: runs the setup.js script described below

## docker

The docker-compose.yml file is intented to be used in development, It has images for node postgres and redis.
to interact with containers use the nail helper like so:

- `docker compose up -d`: spin up docker compose 
- `nail npm run build`: runs build script inside container using node image
- `nail test:all`: runs all tests
- `nail mocha --grep="keyword"` to run specific set of tests

nail has other useful commands like: `nail psql` , `nail shell` and others, for a complete list look at the source code.

## What's next

If you look for the word `TODO` in this project you'll find some places where your intervention could be needed to better fit the needs of your new project. Feel free to
modify anything you want!

-----
This project is a fork form [express-knex-typescript-template](https://github.com/cdellacqua/express-knex-typescript-template)
