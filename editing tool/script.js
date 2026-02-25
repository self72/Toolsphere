// === Search Filter ===
const searchInput = document.getElementById("searchInput");
const toolCards = document.querySelectorAll(".tool-card");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  toolCards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(query) ? "block" : "none";
  });
});

// === Tab Switching ===
const tabs = document.querySelectorAll(".tab-btn");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // remove active class
    tabs.forEach(btn => btn.classList.remove("active"));
    tab.classList.add("active");

    const category = tab.dataset.category;

    toolCards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
