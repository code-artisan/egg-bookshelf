module.exports = function (bookshelf) {
  if (bookshelf) {
    return bookshelf.Model.extend({
      get: function (options) {
        return this.fetch({ require: false, ...options });
      },
      list: function (options) {
        return this.fetchAll({ require: false, ...options });
      },
    }, {
      paginate: async function (pageSize, page, options) {
        return this.fetchPage({
          page: page,
          pageSize: pageSize || 1,
          ...options,
        }).then(async (items) => {
          const total = await this.count();

          return {
            data: items,
            meta: {
              pagination: {
                total: total,
                count: total,
                per_page: pageSize || 1,
                current_page: page || 1,
                total_pages: Math.ceil(total / (pageSize || 1)),
                links: [],
              },
            },
          };
        });
      },

      all: function (options) {
        return this.findAll({ require: false, ...options });
      },

      first: function (options) {
        console.log('first...', options);
        return this.fetch({ require: false, ...options });
      },
    });
  }

  throw new Error('Must pass an initialized bookshelf instance');
}

module.exports.pluggable = function (bookshelf) {
  bookshelf.Model = module.exports.apply(null, arguments);
}
