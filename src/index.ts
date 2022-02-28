import { parse, walk, generate, CssNode } from 'css-tree';

export default function cssSelectorRename(
  css: string,
  options: {
    test: RegExp | ((name: string) => boolean);
    selector: {
      tags: boolean;
      ids: boolean;
      classes: boolean;
    };
    rename: (value: string, type: CssNode['type']) => string;
  }
): string {
  const ast = parse(css, { positions: false });

  const { rename, selector, test = () => true } = options;
  const { tags, ids, classes } = Object.assign(
    {
      tags: true,
      ids: false,
      classes: true,
    },
    selector
  );

  const testFn = test instanceof RegExp ? (name: string) => test.test(name) : test;

  walk(ast, {
    enter(node: CssNode) {
      const type = node.type;
      if (node.type === 'Atrule' && node.name === 'keyframes') {
        return this.skip;
      }
      if (tags && type === 'TypeSelector' && node.name !== '*') {
        if (testFn(node.name)) {
          node.name = rename(node.name, type);
        }
      } else if (classes && type === 'ClassSelector') {
        if (testFn(node.name)) {
          node.name = rename(node.name, type);
        }
      } else if (ids && type === 'IdSelector') {
        if (testFn(node.name)) {
          node.name = rename(node.name, type);
        }
      }
    },
  });

  return generate(ast, { sourceMap: false });
}
