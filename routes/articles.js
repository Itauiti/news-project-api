const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

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
}), createArticle);

router.delete('/:articleId', deleteArticle);

module.exports = router;
