const { Phone } = require('./../models');
const _ = require('lodash');

module.exports.getPhones = async (req, res, next) => {
  try {
    const foundPhones = await Phone.findAll({
      raw: true,
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt']
      },
      limit: 7
    });

    res.status(200).send(foundPhones);
  } catch (error) {
    next(error);
  }
};

module.exports.getPhoneById = async (req, res, next) => {
  const {
    params: { phoneId }
  } = req;

  try {
    const foundPhone = await Phone.findByPk(phoneId, {
      raw: true,
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt']
      }
    });

    foundPhone
      ? res.status(200).send(foundPhone)
      : res.status(404).send('Sorry, phone not found');
  } catch (error) {
    next(error);
  }
};

module.exports.createPhone = async (req, res, next) => {
  const { body } = req;

  try {
    const createdPhone = await Phone.create(body);
    const sendedPhone = _.omit(createdPhone.get(), [
      'id',
      'createdAt',
      'updatedAt'
    ]);

    res.status(200).send(sendedPhone);
  } catch (error) {
    next(error);
  }
};

module.exports.updatePhone = async (req, res) => {};
module.exports.deletePhone = async (req, res) => {};
