---
title: Tooling
description: Learn about Lando MEAN tooling commands like mongo, node, yarn, etc
---

# Tooling

By default, each Lando MEAN recipe will also ship with helpful dev utilities.

This means you can use things like `yarn`, `npm`, `mongo` and `node` via Lando and avoid mucking up your actual computer trying to manage `php` versions and tooling.

```bash
lando mongo     Drop into the mongo shell
lando node      Runs node commands
lando npm       Runs npm commands
lando yarn      Runs yarn commands
```

**Usage examples**

```bash
# Install some things globally
lando npm install -g gulp-cli@latest

# Run yarn install
lando yarn install

# Drop into a mongo shell
lando mongo

# Check the node version
lando node --version
```

You can also run `lando` from inside your app directory for a complete list of commands. This is always advisable as your list of commands may not be 100% the same as above. For example, if you set `database: postgres` you will get `lando psql` instead of `lando mongo`.

## Importing Your Database

**NOTE THIS ONLY APPLIES FOR SQL DATABASES AND NOT MONGO**

Once you've started up your MEAN site, you will need to pull in your database and files before you can really start to dev all the dev. Pulling your files is as easy as downloading an archive and extracting it to the correct location. Importing a database can be done using our helpful `lando db-import` command.

```bash
# Grab your database dump
curl -fsSL -o database.sql.gz "https://url.to.my.db/database.sql.gz"

# Import the database
# NOTE: db-import can handle uncompressed, gzipped or zipped files
# Due to restrictions in how Docker handles file sharing your database
# dump MUST exist somewhere inside of your app directory.
lando db-import database.sql.gz
```

You can learn more about the `db-import` command [over here](https://docs.lando.dev/guides/db-import.html).
