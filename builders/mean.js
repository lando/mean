'use strict';

// Modules
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const utils = require('./../lib/utils');

/*
 * Helper to get database type
 */
const getDatabaseType = options => {
  return _.get(options, '_app.config.services.database.type', options.database) ?? 'mysql';
};

// Tooling defaults
const toolingDefaults = {
  node: {service: 'appserver'},
  npm: {service: 'appserver'},
  yarn: {service: 'appserver'},
};

/*
 * Helper to get config defaults
 */
const getConfigDefaults = options => {
  // attempt to discover the database that is actually being used
  // @NOTE: this will look to see if database is overridden
  const dbConfig = getDatabaseType(options);
  const database = _.first(dbConfig.split(':'));
  const version = _.last(dbConfig.split(':')).substring(0, 2);
  if (database.includes('mysql') || database.includes('mariadb')) {
    if (version === '8.') {
      options.defaultFiles.database = 'mysql8.cnf';
    } else {
      options.defaultFiles.database = 'mysql.cnf';
    }
  }

  // Verify files exist and remove if it doesn't
  _.forEach(options.defaultFiles, (file, type) => {
    if (!fs.existsSync(`${options.confDest}/${file}`)) {
      delete options.defaultFiles[type];
    }
  });

  // Return
  return options.defaultFiles;
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
    defaultFiles: {
    },
    globals: {},
    node: '18',
    port: '80',
    ssl: false,
    proxy: {},
  },
  builder: (parent, config) => class LandoMean extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      options.defaultFiles = _.merge({}, getConfigDefaults(_.cloneDeep(options)), options.defaultFiles);
      options.services = _.merge({}, getServices(options), options.services);
      options.tooling = _.merge({}, getTooling(options), options.tooling);
      options.proxy = _.set({}, 'appserver', [`${options.app}.${options._app._config.domain}:${options.port}`]);
      // Send downstream
      super(id, _.merge({}, config, options));
    };
  },
};
