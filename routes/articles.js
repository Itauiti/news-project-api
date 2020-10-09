const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { celebrateParamsError, celebrateBodyError } = require('../middlewares/celebrateErrorsHandler');

const validationUrl = require('../validation/validationUrl');

const {
  getAllArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

router.get('/', getAllArticles);
router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30),
    title: Joi.string().required().min(2).max(30),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validationUrl),
    image: Joi.string().required().custom(validationUrl),
  }),
}), celebrateBodyError, createArticle);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.objectId(),
  }),
}), celebrateParamsError, deleteArticle);

module.exports = router;
