// data model with setters and getters
// Language: javascript
// Path: models/data.js
class Data {
  constructor() {
    this.data = {};
  }

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}

export default Data;
