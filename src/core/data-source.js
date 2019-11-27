import objectAssign from "object-assign";

const dataSourceDefaultOptions = {
  data: [],
  page: 1,
  pageSize: 10,
  totalCount: 0
};

class DataSource {
  constructor(options) {
    objectAssign(this, dataSourceDefaultOptions, options);
  }

  view() {
    return this.data || [];
  }

  requestParams() {
    return {
      page: this.page,
      pageSize: this.pageSize
    };
  }

  static empty() {
    return new DataSource();
  }
}

export default DataSource;
