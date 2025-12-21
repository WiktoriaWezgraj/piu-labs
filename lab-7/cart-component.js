const tpl = document.createElement('template');

tpl.innerHTML = `
  <style>
    aside {
      border: 1px solid var(--border);
      padding: 20px;
      position: sticky;
      top: 20px;
    }

    .item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-size: 0.85rem;
    }

    .sum {
      border-top: 1px solid var(--border);
      padding-top: 10px;
      margin-top: 10px;
      font-weight: 500;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
    }
  </style>

  <aside>
    <h3>Koszyk</h3>
    <div id="list"></div>
    <div class="sum" id="sum"></div>
  </aside>
`;

class ShoppingCart extends HTMLElement {
  items = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(tpl.content.cloneNode(true));
  }

  addItem(p) {
    this.items.push(p);
    this.render();
  }

  render() {
    const list = this.shadowRoot.getElementById('list');
    const sumEl = this.shadowRoot.getElementById('sum');

    list.innerHTML = '';
    let sum = 0;

    this.items.forEach((p, i) => {
      sum += p.price;
      const row = document.createElement('div');
      row.className = 'item';
      row.innerHTML = `
        ${p.name}
        <button>✕</button>
      `;
      row.querySelector('button').onclick = () => {
        this.items.splice(i, 1);
        this.render();
      };
      list.appendChild(row);
    });

    sumEl.textContent = sum ? `Suma: ${sum.toFixed(2)} zł` : '';
  }
}

customElements.define('shopping-cart', ShoppingCart);
