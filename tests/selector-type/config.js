module.exports = {
  selector: { tags: true, classes: true },
  rename(value, selectorType) {
    return 'ty-' + value;
  },
};
