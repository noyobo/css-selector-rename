module.exports = {
  test: /[-a-z]+/,
  selector: { tags: true, classes: true, ids: true },
  rename(value) {
    if (value === 'page') {
      return 'body';
    }
    return 'ty-' + value;
  },
};
