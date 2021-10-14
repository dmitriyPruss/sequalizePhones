const { Router } = require('express');
const { phoneController } = require('./../controllers');

const phoneRouter = Router();

phoneRouter
  .route('/')
  .get(phoneController.getPhones)
  .post(phoneController.createPhone);

phoneRouter
  .route('/:phoneId')
  .get(phoneController.getPhoneById)
  .patch(phoneController.updatePhone)
  .put(phoneController.updateOrCreatePhone, phoneController.createPhone)
  .delete(phoneController.deletePhone);

module.exports = phoneRouter;
