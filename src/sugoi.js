import request from 'request-promise';

const requestFields = ['contentId', 'title', 'thumbnailUrl'];
const search = (cond) => {
  const url = cond.url();
  const qs = cond.query();

  return request.get({url, qs, json: true}).then(res => {
    return res.data.map(content => {
      return {
        id: content.contentId,
        title: content.title,
        thumbnail: content.thumbnailUrl
      };
    });
  });
};

class Search {
  constructor(word, fileds) {
    this._word = word;
    this._service = 'video';
    this._fields = fileds;
    this._sort = '-startTime';
    this._page = 1;
    this._size = 32;
  }

  url() {
    return `http://api.search.nicovideo.jp/api/v2/${this._service}/contents/search`;
  }

  query() {
    return  {
      q: this._word,
      targets: this._fields.join(','),
      fields: requestFields.join(','),
      _sort: this._sort,
      _offset: this._size * (this._page - 1),
      _limit: this._size,
      _context: 'npm sugoi-search'
    };
  }

  service(_service) {
    this._service = _service;
    return this;
  }

  page(_page) {
    this._page = _page;
    return this;
  }

  sort(_sort) {
    this._sort = _sort;
    return this;
  }

  then(callback) {
    return search(this).then(callback);
  }

  catch(callback) {
    return search(this).catch(callback);
  }
}

export default {
  word: (word) => new Search(word, ['title', 'description', 'tags']),
  tag: (word) => new Search(word, ['tagsExact'])
};
