---
description: Learn how to get started with the Lando MEAN recipe.
---

# Getting Started

## Requirements

Before you get started with this recipe, we assume that you have:

1. [Installed Lando](https://docs.lando.dev/basics/installation.html) and gotten familiar with [its basics](https://docs.lando.dev/basics/).
2. [Initialized](https://docs.lando.dev/basics/init.html) a [Landofile](https://docs.lando.dev/config/lando.html) for your codebase for use with this recipe.
3. Read about the various [services](https://docs.lando.dev/config/services.html), [tooling](https://docs.lando.dev/config/tooling.html), [events](https://docs.lando.dev/config/events.html) and [routing](https://docs.lando.dev/config/proxy.html) Lando offers.

## Quick Start

Note that this could also be used for [ExpressJS](https://expressjs.com/), [Koa](https://koajs.com/), [KeystoneJS](https://keystonejs.com/) or any other MEANish project.

```bash
# Initialize a mean recipe for use with ghost
lando init --source cwd \
  --recipe mean \
  --option port=2368 \
  --option command="su - node -c '/var/www/.npm-global/bin/ghost run -d /app/src -D'" \
  --name meanest-app-youve-ever-seen

# Install ghost
lando ssh -c "npm install ghost-cli@latest -g && mkdir src && cd src && ghost install local --no-start --ip 0.0.0.0"

# Start it up
lando start

# List information about this app.
lando info
```

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "npm install @lando/mean" line to install a particular version eg
# npm install @lando/mean@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:14-alpine sh -c \
  "npm init -y \
  && npm install @lando/mean --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && npm install --production --cwd /tmp/node_modules/@lando/mean \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/mean /plugins/@lando/mean"

# Rebuild the plugin cache
lando --clear
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/mean
```
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/mean`. This command will also show you _where_ the plugin is being loaded from.
