class BeetrootIngredients extends HTMLElement {
  constructor() {
    super();

    this.showMoreLessButton = this.querySelector('.beetroot-ingredients__toggle-show-button');
    this.initMaxHeight = this.style.maxHeight;
  }

  connectedCallback() {
    this.showMoreLessButton.addEventListener('click', this.toggleIngredients.bind(this));
  }

  toggleIngredients() {
    this.offsetHeight < this.scrollHeight ?
      this.style.maxHeight = this.scrollHeight + 'px' :
      this.style.maxHeight = this.initMaxHeight;

    this.showMoreLessButton.classList.toggle('beetroot-ingredients__toggle-show-button--opened', this.offsetHeight < this.scrollHeight);
  }
}

if (!customElements.get('beetroot-ingredients')) {
  customElements.define('beetroot-ingredients', BeetrootIngredients);
}