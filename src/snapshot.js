import request from 'request-promise';

const url = 'http://api.search.nicovideo.jp/api/snapshot';
const method = 'POST';

const search = (condition) => {
  return request({url, method});
};

class Search {
  constructor(word) {
    this.word = word;
    this.service = 'video';
    this.field = 'title';
    this.sort = 'start_time';
    this.order = 'desc';
    this.page = 0;
  }

  field(f) {
    this.field = f;
  }

  page(p) {
    this.page = p;
  }

  order() {
  }

  asc() {
    this.order = 'asc';
  }

  desc() {
    this.order = 'desc';
  }

  then(callback) {
    return search(this).then(callback);
  }
  catch(callback) {
    return search(this).catch(callback);
  }
}

export default (word) => new Search(word);
