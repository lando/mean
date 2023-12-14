'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const landoNodePath = path.join(__dirname, '../node_modules/@lando/node');
const LandoNode = require(`${landoNodePath}/builders/node.js`);

const loadScripts = options => {
  const lando = _.get(options, '_app._lando');
  // Move the script to the confDir and make executable.
  if (fs.existsSync(path.join(landoNodePath, 'scripts'))) {
    const confDir = path.join(lando.config.userConfRoot, 'scripts');
    const dest = lando.utils.moveConfig(path.join(landoNodePath, 'scripts'), confDir);
    lando.utils.makeExecutable(fs.readdirSync(dest), dest);
    lando.log.debug('automoved scripts from %s to %s and set to mode 755',
      path.join(landoNodePath, 'scripts'), confDir);
  }
};

// Builder
module.exports = {
  name: 'mean-node',
  parent: '_appserver',
  builder: (parent, config) => class MeanNode extends LandoNode.builder(parent, LandoNode.config) {
    constructor(id, options = {}, factory) {
      loadScripts(options);
      options.nginxServiceType = 'mean-nginx';
      super(id, options, factory);
    };
  },
};
