import assert from 'power-assert';
import snapshot from '~/src/snapshot';

describe('snapshot', () => {
  it ('default params', () => {
    const search = snapshot('MMD艦これ');

    assert(search.word === 'MMD艦これ');
    assert(search.service === 'video');
    assert(search.field === 'title');
    assert(search.page === 0);
  });
});
