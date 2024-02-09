---
description: Learn how to get started with the Lando MEAN recipe.
---

# Getting Started

## Requirements

Before you get started with this recipe, we assume that you have:

1. [Installed Lando](https://docs.lando.dev/getting-started/installation.html) and gotten familiar with [its basics](https://docs.lando.dev/cli/).
2. [Initialized](https://docs.lando.dev/cli/init.html) a [Landofile](https://docs.lando.dev/core/v3) for your codebase for use with this recipe.
3. Read about the various [services](https://docs.lando.dev/core/v3/lando-service.html), [tooling](https://docs.lando.dev/core/v3/tooling.html), [events](https://docs.lando.dev/core/v3/events.html) and [routing](https://docs.lando.dev/core/v3/proxy.html) Lando offers.

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

