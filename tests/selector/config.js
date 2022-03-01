module.exports = {
  test() {
    return true;
  },
  selector: { tags: true, classes: true },
  rename(value) {
    if (value === 'page') {
      return 'body';
    }
    return 'ty-' + value;
  },
};
