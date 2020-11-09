const validator = require('validator');
const ValidationError = require('../errors/validation-error');
const { validationUrlErrorMessege } = require('../errors/errors-messeges-rus');

const validationUrl = (link) => {
  if (!validator.isURL(link)) {
    throw new ValidationError(validationUrlErrorMessege);
  }
  return link;
};
module.exports = validationUrl;
