// data model with setters and getters
// Language: javascript
// Path: models/current-item.js
class CurrentItem {
  constructor() {
    this.currentItem = [0, 0];
  }

  setCurrentItem(currentItem) {
    this.currentItem = currentItem;
  }

  getCurrentItem() {
    return this.currentItem;
  }
}

export default CurrentItem;
