module.exports = {
  test() {
    return true;
  },
  selector: { tags: true, classes: true },
  rename(value) {
    return 'ty-' + value;
  },
};
