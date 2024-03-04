'use strict';

// Modules
const _ = require('lodash');
const path = require('path');
const utils = require('./../lib/utils');

// Tooling defaults
const getDatabaseType = options => {
  return _.get(options, '_app.config.services.database.type', options.database) ?? 'mysql';
};

const toolingDefaults = {
  node: {service: 'appserver'},
  npm: {service: 'appserver'},
  yarn: {service: 'appserver'},
};

/*
 * Helper to get services
 */
const getServices = options => ({
  appserver: {
    type: `mean-node:${options.node}`,
    command: options.command,
    build_internal: options.build,
    globals: options.globals,
    port: options.port,
    ssl: options.ssl,
  },
  database: {
    config: utils.getServiceConfig(options, ['database']),
    type: `mean-${options.database}`,
    portforward: true,
    creds: {
      user: options.recipe,
      password: options.recipe,
      database: options.recipe,
    },
  },
});

/*
 * Helper to get tooling
 */
const getTooling = options => _.merge({}, toolingDefaults, utils.getDbTooling(options.database));

/*
 * Build MEAN
 */
module.exports = {
  name: 'mean',
  parent: '_recipe',
  config: {
    build: ['npm install'],
    config: {},
    confSrc: path.resolve(__dirname, '..', 'config'),
    command: 'npm start',
    database: 'mongo:7.0',
    globals: {},
    node: '18',
    port: '80',
    ssl: false,
  },
  builder: (parent, config) => class LandoMean extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      options.services = _.merge({}, getServices(options), options.services);
      options.tooling = _.merge({}, getTooling(options), options.tooling);
      options.proxy = _.set({}, 'appserver', [`${options.app}.${options._app._config.domain}:${options.port}`]);
      super(id, options);
    };
  },
};
