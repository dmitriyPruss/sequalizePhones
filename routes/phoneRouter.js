const { Router } = require('express');
const { phoneController } = require('./../controllers');

const phoneRouter = Router();

phoneRouter.get('/', phoneController.getPhones);
phoneRouter.get('/:phoneId', phoneController.getPhoneById);
phoneRouter.post('/:phoneId', phoneController.createPhone);
phoneRouter.put('/:phoneId', phoneController.updatePhone);
phoneRouter.delete('/:phoneId', phoneController.deletePhone);

module.exports = phoneRouter;
