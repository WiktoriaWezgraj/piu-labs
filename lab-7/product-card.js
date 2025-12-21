const tpl = document.createElement('template');

tpl.innerHTML = `
  <style>
    article {
      border: 1px solid var(--border);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    img {
      width: 100%;
      height: 260px;
      object-fit: cover;
    }

    .title {
      font-size: 1rem;
      font-weight: 500;
    }

    .price {
      font-size: 0.9rem;
      color: var(--muted);
    }

    article {
      position: relative;
      border: 1px solid var(--border);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: black;
      color: white;
      font-size: 0.7rem;
      padding: 4px 6px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }


    button {
      margin-top: auto;
      border: none;
      background: var(--accent);
      color: white;
      padding: 8px;
      cursor: pointer;
    }
  </style>

  <article>
    <span class="badge" id="promo"></span>
    <img id="img">
    <div class="title" id="title"></div>
    <div class="price" id="price"></div>
    <div id="extra"></div>
    <button>Dodaj</button>
  </article>
`;

class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(tpl.content.cloneNode(true));
  }

  set product(p) {
    this.data = p;
    this.update();
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').onclick = () => {
      this.dispatchEvent(new CustomEvent('add-to-cart', {
        detail: this.data,
        bubbles: true,
        composed: true
      }));
    };
  }

  update() {
    const p = this.data;
    if (!p) return;

    this.shadowRoot.getElementById('img').src = p.image;
    this.shadowRoot.getElementById('title').textContent = p.name;
    this.shadowRoot.getElementById('price').textContent = `${p.price} pln`;

    const promo = this.shadowRoot.getElementById('promo');
    promo.textContent = p.promo || '';
    promo.style.display = p.promo ? 'block' : 'none';

    const extra = [];
    if (p.colors) extra.push(`Kolory: ${p.colors} `);
    if (p.sizes) extra.push(`Rozmiary: ${p.sizes} `);
    this.shadowRoot.getElementById('extra').textContent = extra.join(' | ');
  }
}

customElements.define('product-card', ProductCard);
