const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Поле "keyword" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "keyword" - 2'],
    maxlength: [30, 'Макимальная длина поля "keyword" - 30'],
  },
  title: {
    type: String,
    required: [true, 'Поле "title" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Макимальная длина поля "title" - 30'],
  },
  text: {
    type: String,
    required: [true, 'Поле "text" должно быть заполнено'],
  },
  date: {
    type: String,
    required: [true, 'Поле "date" должно быть заполнено'],
  },
  source: {
    type: String,
    required: [true, 'Поле "source" должно быть заполнено'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" должно быть заполнено'],
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
