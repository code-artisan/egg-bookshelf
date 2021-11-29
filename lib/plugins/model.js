const defaultPageSize = 10;

module.exports = function (bookshelf) {
  if (bookshelf) {
    return bookshelf.Model.extend({
      take: function (options) {
        return this.fetchAll({ require: false, ...options });
      },
    }, {
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
                current_page: page || defaultPageSize,
                total_pages: response.pagination.pageCount,
                links: [],
              },
            },
          };
        });
      },
    });
  }

  throw new Error('Must pass an initialized bookshelf instance');
}

module.exports.pluggable = function (bookshelf) {
  bookshelf.Model = module.exports.apply(null, arguments);
}
