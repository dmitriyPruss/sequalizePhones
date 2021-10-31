const { CPU, Phone } = require('../models');
const _ = require('lodash');

module.exports.getCPUs = async (req, res, next) => {
  try {
    const foundCPUs = await CPU.findAll({
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      limit: 5
    });

    res.status(200).send(foundCPUs);
  } catch (error) {
    next(error);
  }
};

module.exports.getPhonesByCPU = async (req, res, next) => {
  const {
    params: { ['cpuId']: cpuId }
  } = req;

  try {
    // 1 variant - JOIN ----------------------------------
    const sortedPhonesByCPU = await Phone.findAll({
      include: {
        model: CPU,
        attributes: {
          exclude: ['id', 'createdAt', 'updatedAt']
        },
        where: { id: cpuId }
      },
      where: { CPU_id: cpuId },
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'CPU_id']
      }
    });
    res.status(200).send(sortedPhonesByCPU);
    // ----------------------------------------------------
    // 2 variant - MAGIC METHODS --------------------------
    // const [sortedCPU] = await CPU.findAll({
    //   where: { id: cpuId }
    // });
    // const foundPhones = await sortedCPU.getPhones({
    //   raw: true,
    //   attributes: {
    //     exclude: ['createdAt', 'updatedAt', 'CPU_id']
    //   }
    // });
    // const sendedPhones = foundPhones.map(phone => {
    //   phone.CPU_params = _.omit(sortedCPU.dataValues, [
    //     'id',
    //     'createdAt',
    //     'updatedAt'
    //   ]);
    //   return phone;
    // });
    // res.status(200).send(sendedPhones);
    // ----------------------------------------------------
  } catch (error) {
    next(error);
  }
};

module.exports.createPhoneByCPU = async (req, res, next) => {
  const {
    body,
    params: { ['cpuId']: cpuId }
  } = req;

  try {
    // 1 variant - JOIN ----------------------------------
    // body.CPU_id = cpuId;
    // const createdPhone = await Phone.create(body);

    // const sortedPhoneByCPU = await Phone.findOne({
    //   include: {
    //     model: CPU,
    //     attributes: {
    //       exclude: ['id', 'createdAt', 'updatedAt']
    //     },
    //     where: { id: cpuId }
    //   },
    //   where: { id: createdPhone.id },
    //   raw: true,
    //   attributes: {
    //     exclude: [, 'createdAt', 'updatedAt', 'CPU_id']
    //   }
    // });

    // res.status(200).send(sortedPhoneByCPU);
    // ----------------------------------------------------

    // 2 - MAGIC METHODS
    const [selectedCPU] = await CPU.findAll({
      where: { id: cpuId }
    });

    body.CPU_id = cpuId;

    const createdPhone = await selectedCPU.createPhone(body);

    const sendedPhone = _.omit(createdPhone.get(), [
      'createdAt',
      'updatedAt',
      'CPU_id'
    ]);
    sendedPhone.CPU_params = _.omit(selectedCPU.dataValues, [
      'id',
      'createdAt',
      'updatedAt'
    ]);

    res.status(200).send(sendedPhone);
    // ----------------------------------------------------
  } catch (error) {
    next(error);
  }
};
