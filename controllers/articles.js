const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const AccessError = require('../errors/access-error');

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
    return next(err);
  }
}

async function deleteArticle(req, res, next) {
  const { articleId } = req.params;
  const userId = req.user._id;

  try {
    const article = await Article.findById(articleId).select('+owner');
    if (article === null) {
      throw new NotFoundError('Объект не найден');
    } else if (!(article.owner.toString() === userId)) {
      throw new AccessError('Вы не можете удалить чужую статью');
    } else {
      await article.remove();
      return res.send(article);
    }
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
