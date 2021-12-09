const defaultPageSize = 10;

const methods = {
  take: function (options) {
    return this.fetchAll({ require: false, ...options });
  },
  first: function (options) {
    return this.fetch({ require: false, ...options });
  },
  paginate: function (pageSize, page, options) {
    return this.fetchPage({
      page: page,
      pageSize: pageSize || defaultPageSize,
      ...options,
    }).then((response) => {
      const total = response.pagination.rowCount;

      return {
        data: response,
        meta: {
          pagination: {
            total: total,
            count: total,
            per_page: pageSize || defaultPageSize,
            current_page: parseInt(page) || defaultPageSize,
            total_pages: response.pagination.pageCount,
            links: [],
          },
        },
      };
    });
  },
};

module.exports = function (bookshelf) {
  if (bookshelf) {
    return bookshelf.Model.extend(methods, methods);
  }

  throw new Error('Must pass an initialized bookshelf instance');
}

module.exports.pluggable = function (bookshelf) {
  bookshelf.Model = module.exports.apply(null, arguments);
}
