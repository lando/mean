# MEAN Defaults Example

This example exists primarily to test the following documentation:

* [MEAN Recipe](https://docs.devwithlando.io/tutorials/mean.html)

## Start up tests

Run the following commands to get up and running with this example.

```bash
# Should poweroff
lando poweroff

# Initialize an empty mean recipe
rm -rf mean && mkdir -p mean && cd mean
lando init --source cwd --recipe mean --option node=22 --option port=2368 --option command="/var/www/.npm-global/bin/ghost run -d /app/src -D" --name lando-mean
cp -f ../../.lando.upstream.yml .lando.upstream.yml && cat .lando.upstream.yml

# Should install the ghost cli and install a new ghost app
cd mean
lando ssh -c "npm install ghost-cli@latest -g && mkdir src && cd src && ghost install local --ip 0.0.0.0 && ghost stop"

# Should create a package.json
cd mean
lando npm init -y
lando ssh --service "appserver" -c "cat package.json"

# Should start up successfully
cd mean
lando start
```

## Verification commands

Run the following commands to validate things are rolling as they should.

```bash
# Should return the ghost default page
cd mean
lando exec appserver -- curl -L localhost:2368 | grep "Ghost"

# Should use node 22 if specified
cd mean
lando node -v | grep 22.

# Should be running mongo 7.0 by default
cd mean
lando exec database -- mongod --version | grep "v7.0"

# Should have yarn available
cd mean
lando yarn -v

# Should have npm available
cd mean
lando npm -v

# Should have node available
cd mean
lando node -v

# Should be able to npm global install
cd mean
lando npm -g install eslint
lando exec appserver -- eslint -v

# Should be able to npm install
cd mean
lando npm install eslint
lando exec appserver -- eslint -v
lando exec appserver -- which eslint | grep /app/node_modules
```

## Destroy tests

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
cd mean
lando destroy -y
lando poweroff
```
