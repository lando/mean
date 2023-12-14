'use strict';

const _ = require('lodash');
const LandoMongo = require('./../node_modules/@lando/mongo/builders/mongo.js');

// Builder
module.exports = {
  name: 'mean-mongo',
  parent: '_service',
  builder: (parent, config) => class MeanMongo extends LandoMongo.builder(parent, LandoMongo.config) {
    constructor(id, options = {}) {
      super(id, options, {services: _.set({}, options.name)});
    };
  },
};
