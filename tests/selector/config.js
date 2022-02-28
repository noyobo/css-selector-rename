module.exports = {
  test() {
    return true;
  },
  selector: {
    ids: false,
  },
  rename(value) {
    return 'ty-' + value;
  },
};
