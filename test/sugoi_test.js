import assert from 'power-assert';
import _ from 'lodash';
import sugoi from '~/src/sugoi';

describe('sugoi', () => {
  describe ('default values', () => {
    const search = () => sugoi.word('MMD艦これ');

    it ('#page should eq 1', () => assert(search()._page  === 1));
    it ('#size should eq 32', () => assert(search()._size === 32));
    it ('#sort should eq -startTime', () => assert(search()._sort === '-startTime'));
  });

  it ('#word()', () => {
    const search = sugoi.word('MMD艦これ');

    assert(search._word === 'MMD艦これ');
    assert(search._service === 'video');
    assert(_.isEqual(search._fields, ['title', 'description', 'tags']));
  });

  it ('#tag()', () => {
    const search = sugoi.tag('MMD艦これ');

    assert(search._word === 'MMD艦これ');
    assert(_.isEqual(search._fields, ['tagsExact']));
  });

  it ('#them()', () => {
    const search = sugoi.tag('MMD艦これ').sort('+startTime');

    return search.then(items => {
      const item = items[0];
      assert(items.length === 32);
      assert(item.id === 'sm21231366');
      assert(item.title === '【MMD】駆逐艦島風');
    });
  });
});
