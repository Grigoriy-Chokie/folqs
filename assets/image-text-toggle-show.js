if (!customElements.get('image-text-toggle-show')) {
  customElements.define('image-text-toggle-show',
    class ImageTextSeeMore extends HTMLElement {
      constructor() {
        super();

        this.button = this.querySelector('button');
        this.textContainer = this.querySelector('.image-with-text__text');
      }

      connectedCallback() {
        this.button.addEventListener('click', this.toggleText.bind(this));
      }

      toggleText() {
        this.textContainer.classList.toggle('image-with-text__text--show');
      }
    }
);
}

