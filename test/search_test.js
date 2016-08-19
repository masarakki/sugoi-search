import assert from 'power-assert';
import _ from 'lodash';
import search from '~/src/search';

describe('search', () => {
  describe ('default values', () => {
    const subject = () => search.word('MMD艦これ');

    it ('#page should eq 1', () => assert(subject().page  === 1));
    it ('#size should eq 32', () => assert(subject().size === 32));
    it ('#sort should eq -startTime', () => assert(subject().sort === '-startTime'));
  });

  it ('#word()', () => {
    const subject = search.word('MMD艦これ');

    assert(subject.word === 'MMD艦これ');
    assert(subject.service === 'video');
    assert(_.isEqual(subject.fields, ['title', 'description', 'tags']));

    return subject.then(res => {
      console.log(res);
    });
  });

  it ('#tag()', () => {
    const subject = search.tag('MMD艦これ');

    assert(subject.word === 'MMD艦これ');
    assert(_.isEqual(subject.fields, ['tagsExact']));
    return subject.then(res => {
      console.log(res);
    });
  });
});
