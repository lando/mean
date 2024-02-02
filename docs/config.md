---
title: Configuration
description: Learn how to configure the Lando MEAN recipe.
---

# Configuration

While Lando [recipes](https://docs.lando.dev/core/v3/recipes.html) set sane defaults so they work out of the box, they are also [configurable](https://docs.lando.dev/core/v3/recipes.html#config).

Here are the configuration options, set to the default values, for this recipe's [Landofile](https://docs.lando.dev/core/v3). If you are unsure about where this goes or what this means, we *highly recommend* scanning the [recipes documentation](https://docs.lando.dev/core/v3/recipes.html) to get a good handle on how the magicks work.

```yaml
recipe: mean
config:
  node: 10
  build:
    - npm install
  command: npm start
  database: mongo:4.0
  globals: []
  port: '80'
  ssl: false
  config:
    database: SEE BELOW
```

Note that if the above config options are not enough, all Lando recipes can be further [extended and overriden](https://docs.lando.dev/core/v3/recipes.html#extending-and-overriding-recipes).

## Choosing a node version

You can set `node` to any version that is available in our [node service](https://docs.lando.dev/node). However, you should consult the requirements for whatever you are running to make sure that version is actually supported.

The [recipe config](https://docs.lando.dev/core/v3/recipes.html#config) to set the MEAN recipe to use `node` version `8` is shown below:

```yaml
recipe: mean
config:
  node: 8
```

## Installing application dependencies

Because most MEAN projects will require you `npm install` before they can start successfully, Lando will automatically run `npm install` before it runs what you specify as your `commmand`. You can, however, alter this to whatever you need.

```yaml
recipe: mean
config:
  build:
    - npm install
  command: yarn dev
```

Note that a good rule of thumb is that `build` should install whatever **node** dependencies you need to start your app. If you require other non-node dependencies like server packages, consider using a [build step](https://docs.lando.dev/core/v3/lando-service.html#build-steps).

## Setting a command

By default, your MEAN recipe will attempt to start the `node` service by running `npm start`. You can easily change this any other command.

**Running a node script directly**

```yaml
recipe: mean
config:
  command: node /app/server.js
```

**Running the `yarn dev` script**

```yaml
recipe: mean
config:
  command: yarn dev
```

Note that whatever `command` you specify, you will want to make sure `build` is also set to something that makes sense.

## Choosing a database backend

By default, this recipe will use the default version of our [`mongo`](https://docs.lando.dev/mongo) service as the database backend but you can also switch this to use [`mysql`](https://docs.lando.dev/mysql), [`mariadb`](https://docs.lando.dev/mariadb) or ['postgres'](https://docs.lando.dev/postgres) instead.

Note that you can also specify a version *as long as it is a version available for use with lando* for either `mongo`, `mysql`, `mariadb` or `postgres`.

#### Using mongo (default)

```yaml
recipe: mean
config:
  database: mongo
```

#### Using MySQL

```yaml
recipe: mean
config:
  database: mysql
```

#### Using MariaDB

```yaml
recipe: mean
config:
  database: mariadb
```

#### Using Postgres

```yaml
recipe: mean
config:
  database: postgres
```

#### Using a custom version

```yaml
recipe: mean
config:
  database: postgres:9.6
```

## Installing global dependencies

You can also use the `globals` key if you need to install any [global node dependenices](https://www.mongodb.com/mean-stack). This follows the same syntax as your normal [`package.json`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json) except written as YAML instead of JSON.

An example of globally installing the `latest` `gulp-cli` is shown below:

```yaml
recipe: mean
config:
  globals:
    gulp-cli: latest
```

See [install global node dependencies](https://docs.lando.dev/node/config.html#installing-global-dependencies) for more info.

## Using SSL

Also note that `ssl: true` will only generate certs in the [default locations](https://docs.lando.dev/core/v3/security.html) and expose port `443`. It is up to the user to use the certs and secure port correctly in their application like the `node` snippet below:

```js
// Get our key and cert
const key = fs.readFileSync('/certs/cert.key')
const cert = fs.readFileSync('/certs/cert.crt'),

// Create our servers
https.createServer({key, cert}, app).listen(443);
http.createServer(app).listen(80);

// Basic HTTP response
app.get('/', (req, res) => {
  res.header('Content-type', 'text/html');
  return res.end('<h1>I said "Oh my!" What a marvelous tune!!!</h1>');
});
```

## Setting a port

While we assume your MEAN app is running on port `80`, we recognize that many `node` apps also run on port `3000` or otherwise. You can easily change our default to match whatever your app needs.

```yaml
recipe: mean
config:
  port: '3000'
```

## Connecting to your database

Lando will automatically set up a database with a user and password and also set an environment variable called [`LANDO INFO`](https://docs.lando.dev/guides/lando-info.html) that contains useful information about how your application can access other Lando services.

The default database connection information for a MEAN site is shown below:

Note that the `host` is not `localhost` but `database`.

```yaml
host: database

# mongo
user: root
password: none
port: 27017

# mysql/mariadb
# database: mean
# username: mean
# password: mean
# port: 3306

# postgres
# database: mean
# username: postgres
# password: none
# port: 5432
```

You can get also get the above information, and more, by using the [`lando info`](https://docs.lando.dev/cli/info.html) command.

## Using custom config files

You may need to override our [default MEAN config](https://github.com/lando/mean/tree/main/builders) with your own.

If you do this, you must use files that exist inside your application and express them relative to your project root as shown below:

**A hypothetical project**

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory but you can call it whatever you want such as `.lando` in the example below:

```bash
./
|-- config
   |-- my-custom.cnf
|-- index.php
|-- .lando.yml
```

**Landofile using custom mean config**

```yaml
recipe: mean
config:
  config:
    database: config/my-custom.cnf
```
