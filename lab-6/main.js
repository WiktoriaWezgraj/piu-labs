import Ajax from "./ajax.js";

const api = new Ajax({
  baseURL: "https://jsonplaceholder.typicode.com"
});

const loadBtn = document.getElementById("loadBtn");
const errorBtn = document.getElementById("errorBtn");
const resetBtn = document.getElementById("resetBtn");
const list = document.getElementById("list");
const errorBox = document.getElementById("error");
const loader = document.getElementById("loader");

function resetView() {
  list.innerHTML = "";
  errorBox.textContent = "";
  loader.classList.add("hidden");
}

loadBtn.addEventListener("click", async () => {
  resetView();
  loader.classList.remove("hidden");

  try {
    const data = await api.get("/posts");

    data.slice(0, 10).forEach(post => {
      const li = document.createElement("li");
      li.textContent = post.title;
      list.appendChild(li);
    });

  } catch (err) {
    errorBox.textContent = err.message;
  } finally {
    loader.classList.add("hidden");
  }
});

errorBtn.addEventListener("click", async () => {
  resetView();
  loader.classList.remove("hidden");

  try {
    await api.get("/blad-ktory-nie-istnieje");
  } catch (err) {
    errorBox.textContent = err.message;
  } finally {
    loader.classList.add("hidden");
  }
});

resetBtn.addEventListener("click", resetView);
