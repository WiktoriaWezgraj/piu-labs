import products from './data.json' with { type: 'json' };

const tpl = document.createElement('template');

tpl.innerHTML = `
  <style>
    section {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }

    @media (max-width: 800px) {
      section {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 500px) {
      section {
        grid-template-columns: 1fr;
      }
    }
  </style>

  <section></section>
`;

class ProductArea extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(tpl.content.cloneNode(true));
  }

  connectedCallback() {
    const container = this.shadowRoot.querySelector('section');

    for (const product of products) {
      const card = document.createElement('product-card');
      card.product = product;   
      container.appendChild(card);
    }
  }
}

customElements.define('product-area', ProductArea);
