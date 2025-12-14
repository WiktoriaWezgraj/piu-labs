class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
  display: block;
}

.card {
  position: relative;
  min-height: 430px;
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.15);
}

/* OBRAZ */
.image {
  height: 200px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image ::slotted(img) {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

/* PROMOCJA */
.promotion {
  position: absolute;
  top: 14px;
  left: 14px;
  background: linear-gradient(135deg, #ff4d4d, #d60000);
  color: #fff;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75em;
  font-weight: bold;
}

/* TEKST */
.name {
  font-size: 1.15em;
  font-weight: 600;
  margin: 6px 0;
}

.price {
  font-size: 1.1em;
  font-weight: bold;
  color: #111;
  margin-bottom: 6px;
}

.colors,
.sizes {
  font-size: 0.85em;
  color: #666;
  margin-bottom: 4px;
}

/* PRZYCISK */
button {
  margin-top: auto;
  padding: 12px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #000, #333);
  color: white;
  font-size: 0.9em;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

button:hover {
  background: linear-gradient(135deg, #222, #555);
  transform: scale(1.03);
}
</style>

      <div class="card">
        <div class="image">
          <slot name="image"></slot>
        </div>

        <div class="promotion">
          <slot name="promotion"></slot>
        </div>

        <div class="name">
          <slot name="name"></slot>
        </div>

        <div class="price">
          <slot name="price"></slot>
        </div>

        <div class="colors">
          <slot name="colors"></slot>
        </div>

        <div class="sizes">
          <slot name="sizes"></slot>
        </div>

        <button>Do koszyka</button>
      </div>
    `;
  }
}

customElements.define('product-card', ProductCard);
