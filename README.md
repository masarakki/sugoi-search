# Sugoi Search

search niconico

## Usage

```js

import sugoi from 'sugoi-search';

sugoi.word('MMD艦これ').page(20).then(videos => {
  console.log(videos);
});

sugoi.tag('デイリーパンツ').service('illust').then(images => {
  console.log(images);
});

```
