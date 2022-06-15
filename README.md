# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker [Download & Install Docker](https://docs.docker.com/engine/install/)

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

# INITIAL STEPS (REQUIRED SECTION)

Create ".env" file in the root folder (you can use sample file).

Set `USE_FASTIFY` to `true` (use Fastify) or `false` (use Express)

## TypeOrm Migrations

Whenever the db scheme is changed, use:

```
npm run migration:generate
```

Apply migration:

```
npm run migration:run
```

Revert migration:

```
npm run migration:revert
```

## Running application (dev-mode)

Start App:

```
npm run start
```

or use:

```
npm run start:docker
```

to apply migration and then start App

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Docker

### Download images

Use this command if you what to download both images at the same time (images in the same repository):

```
docker pull -a yuskivpm/rss-2021q2-nodejs
```

### Starting application

Build (if necessary) and start multi-container application:

```
docker-compose up
```

Build (if necessary) and start multi-container application:

```
docker-compose down
```

Build image with specific PORT value:

```
docker build --build-arg PORT=4001 .
```

## Testing

After application running open new terminal and enter

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

# Artilery testing

## Summary report

```
|-----------------------|----------------|----------------|
| HttpAdapter           | Express        | Fastify        |
|-----------------------|----------------|----------------|
| Scenarios launched:   | 6000           | 6000           |
| Scenarios completed:  | 6000           | 6000           |
| Requests completed:   | 6000           | 6000           |
| Mean response/sec:    | 9.99           | 9.99           |
| Response time (msec): |                |                |
|  min:                 | 1              | 1              |
|  max:                 | 67             | 76             |
|  median:              | 2              | 2              |
|  p95:                 | 3              | 3              |
|  p99:                 | 4              | 4              |
| Scenario counts:      | 0: 6000 (100%) | 0: 6000 (100%) |
| Codes:                | 200: 6000      | 200: 6000      |
|-----------------------|----------------|----------------|
```
