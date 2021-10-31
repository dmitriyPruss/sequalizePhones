const { Router } = require('express');
const { cpuController } = require('../controllers');

const cpuRouter = Router();

cpuRouter.route('/').get(cpuController.getCPUs);

cpuRouter
  .route('/:cpuId/phones')
  .get(cpuController.getPhonesByCPU)
  .post(cpuController.createPhoneByCPU);

module.exports = cpuRouter;
