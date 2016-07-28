class DataStorage {
  constructor() {
    this.data = [];
    this.events = {};
  }
  select(filter) {
    if (typeof filter === 'function') return this.data.filter(filter);
    else return this.data;
  }
  insert(object) {
    this.data.push(object);
    this.send('insert', [object, this.data]);
  }
  update(idx, info) {
    if (typeof this.data[idx] !== 'undefined') {
      this.data[idx] = info;
      this.send('update', [this.data[idx], this.data]);
    }
  }
  delete(idx) {
    if (typeof this.data[idx] !== 'undefined') {
      const deletedUser = this.data.splice(idx, 1);
      this.send('delete', [deletedUser, this.data]);
    }
  }
  subscribe(event, callback) {
    const events = this.events;
    if (!events.hasOwnProperty(event)) events[event] = [];
    const idx = events[event].push(callback) - 1;
    return {
      unsubscribe: function() {
        events[event].splice(idx, 1);
      }
    };
  }
  send(type, params) {
    if (this.events.hasOwnProperty(type) && this.events[type].length) {
      this.events[type].forEach(callback => callback.apply(null, params));
    }
  }
}
