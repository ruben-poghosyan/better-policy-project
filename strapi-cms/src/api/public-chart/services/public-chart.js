'use strict';

/**
 * public-chart service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::public-chart.public-chart');
