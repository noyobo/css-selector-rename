# css-selector-rename

[![Node.js CI](https://github.com/noyobo/css-selector-rename/actions/workflows/node.js.yml/badge.svg)](https://github.com/noyobo/css-selector-rename/actions/workflows/node.js.yml)

CSS 选择器重命名

## usage

```js
import cssSelectorRename from 'css-selector-rename';
const output = cssSelectorRename(input, options);
```

```css
.foo {
}

div {
}
```

```css
.rename-foo {
}

rename-div {
}
```

## Options

default options

```js
{
  test: (name) => true,
  selector: {
    classes: false,
    ids: false,
    tags: false,
  },
  rename: (name, type) => name
}
```

- `test?: (name: string) => boolean` | `RegExp` only rename when return true
- `selector?: Partial<Record<'classes' | 'tags' | 'ids', boolean>>` walk selector type
- `rename: (name: string, type: 'classes' | 'tags' | 'ids') => string` return new selector name
