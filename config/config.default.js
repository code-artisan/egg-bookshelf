/**
 * bookshelf default config
 * @member Config#bookshelf
 * @property {String} SOME_KEY - some description
 */
exports.bookshelf = {
  path: 'model',
  exclude: '',
  delegate: 'model',
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bookshelf',
  },
};
