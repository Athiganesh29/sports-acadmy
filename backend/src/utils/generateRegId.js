const Registration = require('../models/Registration');

const generateRegId = async () => {
  const year = new Date().getFullYear();
  const prefix = `SA-${year}-`;

  const lastReg = await Registration.findOne({ registrationId: new RegExp(`^${prefix}`) })
    .sort({ registrationId: -1 })
    .lean();

  let nextNum = 1;
  if (lastReg) {
    const lastNum = parseInt(lastReg.registrationId.split('-').pop(), 10);
    nextNum = lastNum + 1;
  }

  return `${prefix}${String(nextNum).padStart(4, '0')}`;
};

module.exports = generateRegId;
