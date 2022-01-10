'use strict';

/*
 * Init MEAN
 */
module.exports = {
  name: 'mean',
  overrides: {
    webroot: {
      when: () => false,
    },
  },
};
