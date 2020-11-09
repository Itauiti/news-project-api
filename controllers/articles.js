const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const AccessError = require('../errors/access-error');
const ValidationError = require('../errors/validation-error');
const { accessErrorMessege, notFoundObjectErrorMessege, validationIdErrorMessege } = require('../errors/errors-messeges-rus');

async function getAllArticles(req, res, next) {
  const userId = req.user._id;
  try {
    const articles = await Article.find({ owner: userId });
    return res.send(articles);
  } catch (err) {
    return next(err);
  }
}

async function createArticle(req, res, next) {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  try {
    const article = await Article.create({
      keyword, title, text, date, source, link, image, owner,
    });
    return res.send(article);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
    }
    return next(err);
  }
}

async function deleteArticle(req, res, next) {
  const { articleId } = req.params;
  const userId = req.user._id;

  try {
    const article = await Article.findById(articleId).select('+owner');
    if (article === null) {
      throw new NotFoundError(notFoundObjectErrorMessege);
    } else if (!(article.owner.toString() === userId)) {
      throw new AccessError(accessErrorMessege);
    } else {
      await article.remove();
      return res.send(article);
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError(validationIdErrorMessege));
    }
    return next(err);
  }
}

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
