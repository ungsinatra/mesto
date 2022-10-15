class Section {
  constructor({ items, renderer }, selectorContainer) {
    this._items = items;
    this._renderer = renderer;
    this._selectorContainer = selectorContainer;
  }
  renderItems() {
    this._items.forEach((element) => {
      this._renderer(element);
    });
  }
  addItem(template) {
    this._selectorContainer.prepend(template);
  }
}

export { Section };
