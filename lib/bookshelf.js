const path = require('path');
const knex = require('knex');
const bookshelf = require('bookshelf');

module.exports = app => {
  const config = app.config.bookshelf;

  app.beforeStart(() => {
    app.bookshelf = bookshelf(knex(config));

    app.bookshelf.plugin(require('bookshelf-modelbase').pluggable);
    app.bookshelf.plugin(require('./plugins/model').pluggable);

    const directory = path.join(app.baseDir, 'app', config.path);

    app.loader.loadToContext(directory, config.delegate, {
      caseStyle: 'lower',
      inject: app,
      ignore: config.exclude,
    });
  });
};
