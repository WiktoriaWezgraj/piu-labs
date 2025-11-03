document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelector(".board");
  const columns = document.querySelectorAll(".column");

  const randomColor = () => `hsl(${Math.random() * 360}, 70%, 80%)`;

  function updateCount(column) {
    const count = column.querySelectorAll(".card").length;
    column.querySelector(".count").textContent = count;
  }

  function saveState() {
    const data = {};
    columns.forEach(col => {
      const key = col.dataset.column;
      const cards = [...col.querySelectorAll(".card")].map(c => ({
        id: c.dataset.id,
        text: c.querySelector(".content").textContent,
        color: c.style.backgroundColor
      }));
      data[key] = cards;
    });
    localStorage.setItem("kanban", JSON.stringify(data));
  }

  function loadState() {
    const saved = JSON.parse(localStorage.getItem("kanban") || "{}");
    Object.keys(saved).forEach(key => {
      const column = document.querySelector(`[data-column="${key}"] .cards`);
      saved[key].forEach(cardData => {
        const card = createCard(cardData.text, cardData.color, cardData.id);
        column.appendChild(card);
      });
    });
    columns.forEach(updateCount);
  }

  function createCard(text = "Nowa karta", color = randomColor(), id = Date.now().toString()) {
    const card = document.createElement("div");
    card.className = "card";
    card.style.backgroundColor = color;
    card.dataset.id = id;

    card.innerHTML = `
      <div class="content" contenteditable="true">${text}</div>
      <div class="card-footer">
        <button class="move-left">←</button>
        <button class="move-right">→</button>
        <button class="delete">✕</button>
        <button class="color">🎨</button>
      </div>
    `;

    card.querySelector(".content").addEventListener("input", saveState);
    return card;
  }

  board.addEventListener("click", e => {
    const btn = e.target;
    const column = btn.closest(".column");

    if (btn.classList.contains("add")) {
      const cards = column.querySelector(".cards");
      cards.appendChild(createCard());
      updateCount(column);
      saveState();
    }

    if (btn.classList.contains("colorize")) {
        const color = randomColor(); 
      column.querySelectorAll(".card").forEach(c => c.style.backgroundColor = color);
      saveState();
    }

    if (btn.classList.contains("sort")) {
      const cards = [...column.querySelectorAll(".card")].sort((a, b) =>
        a.querySelector(".content").textContent.localeCompare(b.querySelector(".content").textContent)
      );
      const container = column.querySelector(".cards");
      container.innerHTML = "";
      cards.forEach(c => container.appendChild(c));
      saveState();
    }

    if (btn.classList.contains("delete")) {
      const card = btn.closest(".card");
      card.remove();
      updateCount(column);
      saveState();
    }

    if (btn.classList.contains("move-left") || btn.classList.contains("move-right")) {
      const card = btn.closest(".card");
      const current = btn.closest(".column");
      let target;
      if (btn.classList.contains("move-left"))
        target = current.previousElementSibling;
      else
        target = current.nextElementSibling;

      if (target && target.classList.contains("column")) {
        target.querySelector(".cards").appendChild(card);
        updateCount(current);
        updateCount(target);
        saveState();
      }
    }

    if (btn.classList.contains("color")) {
      const card = btn.closest(".card");
      card.style.backgroundColor = randomColor();
      saveState();
    }
  });

  loadState();
});
