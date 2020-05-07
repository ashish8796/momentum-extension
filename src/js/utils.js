export class InputHandler {
  constructor(inputEl, cb) {
    this.el = inputEl;
    this.value = '';
    this.cb = cb;

    this.handleOnChange();
  }

  handleOnChange() {
    this.el.addEventListener("change", (event) => {
      this.value = event.target.value;
      this.cb(this.value);
    })
  }
};