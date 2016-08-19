import request from 'request-promise';

const search = (cond) => {
  const url = cond.url();
  const qs = cond.query();
  console.log(qs);
  return request.get({url, qs});
};

const requestFields = ['contentId', 'title', 'thumbnailUrl'];

class Search {
  constructor(word, fileds) {
    this.word = word;
    this.service = 'video';
    this.fields = fileds;
    this.sort = '-startTime';
    this.order = 'desc';
    this.page = 1;
    this.size = 32;
  }

  url() {
    return `http://api.search.nicovideo.jp/api/v2/${this.service}/contents/search`;
  }

  query() {
    return  {
      q: this.word,
      targets: this.fields.join(','),
      fields: requestFields.join(','),
      _sort: this.sort,
      _offset: this.size * (this.page - 1),
      _limit: this.size,
      _context: 'npm sugoi-search'
    };
  }

  page(p) {
    this.page = p;
  }

  sort(s) {
    this.sort = s;
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
}
