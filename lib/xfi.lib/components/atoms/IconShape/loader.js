class StepLoader {
  constructor(end, action) {
    this.end = end;
    this.actions = [];
    this.loaded = 0;
    this._action = action;
  }

  Add(action) {
    this.actions.push(action);

    return this;
  }

  Go() {
    this.actions.forEach((a, i) => {
      let res = result => {
        this.loaded = this.loaded + 1;
        this.actions[i] = result;

        if (this.loaded == this.actions.length) this.end(this.actions);
      };

      if (this._action) this._action(a, res);
      else a(res);
    });
  }
}

export default StepLoader;
